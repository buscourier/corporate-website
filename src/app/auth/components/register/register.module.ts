import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {BackendErrorMessagesModule} from '../../../shared/components/backend-error-messages/backend-error-messages.module'
import {RegisterComponent} from './register.component'

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    RouterModule,
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
