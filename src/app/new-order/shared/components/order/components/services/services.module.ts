import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputNumberModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit'
import {ServicesComponent} from './services.component'

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiCheckboxLabeledModule,
    TuiInputPhoneModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
  ],
  exports: [ServicesComponent],
})
export class ServicesModule {}
