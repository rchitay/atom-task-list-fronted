import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { TaskService } from 'src/app/services/task.service';

import { AlertComponent } from '../alert/alert.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  list:any=[];
  task:any;
  idUser:any;
  constructor(
    private service: TaskService, 
    public dialog: MatDialog,
    public dialogDel: MatDialog,
    public dialogEdit: MatDialog, 
    private datePipe: DatePipe,
    private router: Router) {
      this.idUser = localStorage.getItem("idUser");
      console.log(this.idUser);
      if (this.idUser == undefined || this.idUser == null)
        this.router.navigate(["/login"]);
    }

  ngOnInit(): void {
    this.listing();
  }

  listing(){
    this.list = [];
    this.service.getTasks().subscribe(
      res=>{
        this.list=res;
      },
      err=>console.log(err)
    );
  }

  open(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: "30%",
      height: "50%",
      data: {title: "", description: "", status: ""},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.id !== true) {
        this.task = result;
        this.task.idUser = this.idUser;
        this.task.creationDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd h:mm a')
        this.service.saveTask(this.task).subscribe(
          (response) => {
            this.ngOnInit();
            console.log('Task saved successfully', response);
          },
          (error) => {
            console.error('Error saving task', error);
          }
        );
      }
    });
  }

  edit(id: string){
    this.service.getTaskById(id).subscribe(
      (response) => {
        const dialogRef = this.dialogEdit.open(FormComponent, {
          width: "40%",
          height: "60%",
          data: {title: response.title, description: response.description, status: response.status},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined && result.id !== true) {
            this.task = result;
            this.service.editTask(id, this.task).subscribe(
              (response) => {
                this.ngOnInit();
                console.log('Task edit successfully', response);
              },
              (error) => {
                console.error('Error edit task', error);
              }
            );
          }
        });
      },
      (error) => {
        console.error('Error get task', error);
      }
    );
  }
  delete(id: string){
    const dialogRef = this.dialogDel.open(AlertComponent, {
      width: '250px',
      height: '25%',
      data: {mode: "Delete", id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.id !== true)
      this.service.deleteTask(id).subscribe(
        (response) => {
          this.ngOnInit();
          console.log('Task delete successfully', response);
        },
        (error) => {
          console.error('Error delete task', error);
        }
      );
    });
  }

  closeSession() {
    localStorage.removeItem('idUser');
    this.router.navigate(["/login"])
  }
}