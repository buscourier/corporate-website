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
  TuiInputModule,
  TuiInputPhoneModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {TaskFormComponent} from './task-form.component'

@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
    TuiTextAreaModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
  ],
  exports: [TaskFormComponent],
})
export class TaskFormModule {}
