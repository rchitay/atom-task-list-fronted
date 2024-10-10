import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-user',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponentUser {
  constructor(
    public dialogRef: MatDialogRef<AlertComponentUser>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  close(): void {
    this.dialogRef.close({continue: true});
  }
}
