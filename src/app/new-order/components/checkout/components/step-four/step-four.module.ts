import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {StepFourComponent} from './step-four.component'

@NgModule({
  declarations: [StepFourComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTextAreaModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiCheckboxLabeledModule,
  ],
  exports: [StepFourComponent],
})
export class StepFourModule {}
