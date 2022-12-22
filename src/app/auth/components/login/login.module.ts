import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit'
import {BackendErrorMessagesModule} from '../../../shared/components/backend-error-messages/backend-error-messages.module'
import {LoginComponent} from './login.component'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiLabelModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    BackendErrorMessagesModule,
    RouterModule,
    TuiFieldErrorPipeModule,
    TuiSvgModule,
  ],
  exports: [LoginComponent],
  // providers: [LOGIN_PROVIDER],
})
export class LoginModule {}
