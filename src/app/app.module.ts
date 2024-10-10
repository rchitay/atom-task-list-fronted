import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { ListComponent } from './components/task/list/list.component';

import { AppRoutingModule } from './app-routing.module';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

import { DatePipe } from '@angular/common';
import { FormComponent } from './components/task/form/form.component';
import { AlertComponent } from './components/task/alert/alert.component';
import { AlertComponentUser } from './components/user/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    FormComponent,
    AlertComponent,
    AlertComponentUser
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [DatePipe, {
    provide: MatDialogRef,
    useValue: {}
  }, MatDialog],
  entryComponents: [
    FormComponent, AlertComponent, AlertComponentUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
