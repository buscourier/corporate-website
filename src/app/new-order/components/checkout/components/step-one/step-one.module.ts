import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit'
import {PatchFormGroupValuesModule} from '../../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {StepOneComponent} from './components/step-one/step-one.component'
import {reducer} from './store/reducer'
import {STEP_ONE_FEATURE} from './store/state'

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(STEP_ONE_FEATURE, reducer),
    PatchFormGroupValuesModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTabsModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputPhoneModule,
    TuiLetModule,
  ],
  exports: [StepOneComponent],
})
export class StepOneModule {}
