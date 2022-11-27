import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {DataComponent} from './components/data/data.component'
import {StepFourComponent} from './step-four.component'
import {reducer} from './store/reducer'
import {STEP_FOUR_FEATURE} from './store/state'

@NgModule({
  declarations: [StepFourComponent, DataComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(STEP_FOUR_FEATURE, reducer),
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
