import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit'
import {ProxyComponent} from './proxy.component'

@NgModule({
  declarations: [ProxyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
  ],
  exports: [ProxyComponent],
})
export class ProxyModule {}
