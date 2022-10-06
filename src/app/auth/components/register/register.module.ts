import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {
  BackendErrorMessagesModule
} from "../../../shared/components/backend-error-messages/backend-error-messages.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    RouterModule,
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
