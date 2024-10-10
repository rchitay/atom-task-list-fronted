import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponentUser } from '../alert/alert.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user: any;
  constructor(private fb: FormBuilder, private service: UserService, private router: Router, public dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.getUserByEmail(this.loginForm.value.email).subscribe(
        res=>{
          if(res.message == "Exists"){
            this.router.navigate(['/tasks']);
            localStorage.setItem("idUser", res.id);
          }else {
            this.user = {email: this.loginForm.value.email};
            this.service.saveUser(this.user).subscribe(
              resSave => {
                this.openAlert(this.user.email)
                localStorage.setItem("idUser", resSave.id);
              }
            );
          }
        },
        err=>console.log(err)
      );
    } else {
      console.log('email inválido');
    }
  }

  openAlert(email:string): void {
    const dialogRef = this.dialog.open(AlertComponentUser, {
      width: "250px",
      height: "25%",
      data: {email: email, continue: true},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/tasks']);
    });
  }
}
