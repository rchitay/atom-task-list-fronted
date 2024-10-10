import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user: any;
  constructor(private fb: FormBuilder, private service: UserService, private router: Router) {
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
          }
        },
        err=>console.log(err)
      );
    } else {
      console.log('email inválido');
    }
  }
}
