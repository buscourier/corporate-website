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
import {StepOneComponent} from './step-one.component'
import {reducer} from './store/reducer'
import {STEP_ONE_FEATURE} from './store/state'
import {PersonModule} from './components/person/person.module'

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    RouterModule,
    PersonModule,
    StoreModule.forFeature(STEP_ONE_FEATURE, reducer),
    TuiLetModule,
    TuiButtonModule,
  ],
  exports: [StepOneComponent],
})
export class StepOneModule {}
