import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {
  BackendErrorMessagesModule
} from "../../../shared/components/backend-error-messages/backend-error-messages.module";
import { RouterModule } from '@angular/router';
import {LOGIN_PROVIDER} from "./services/login.service";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    RouterModule,
  ],
  exports: [
    LoginComponent
  ],
  providers: [LOGIN_PROVIDER]
})
export class LoginModule { }
