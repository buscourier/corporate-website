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
import {DataComponent} from './components/data/data.component'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [StepFourComponent, DataComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTextAreaModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiCheckboxLabeledModule,
    TuiLetModule,
  ],
  exports: [StepFourComponent],
})
export class StepFourModule {}
