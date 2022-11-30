import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiErrorModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioListModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {PatchFormGroupValuesModule} from '../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {SetControlValueModule} from '../../../../shared/directives/set-control-value/set-control-value.module'
import {EndPointComponent} from './components/end-point/end-point.component'
import {GetCitiesEffect} from './store/effects/get-cities.effect'
import {GetOfficesEffect} from './store/effects/get-offices.effect'
import {reducer} from './store/reducer'
import {END_POINT_FEATURE} from './store/state'

@NgModule({
  declarations: [EndPointComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(END_POINT_FEATURE, reducer),
    EffectsModule.forFeature([GetCitiesEffect, GetOfficesEffect]),
    ReactiveFormsModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiComboBoxModule,
    SetControlValueModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    PatchFormGroupValuesModule,
    TuiInputModule,
    TuiRadioListModule,
    TuiCheckboxLabeledModule,
    TuiSvgModule,
  ],
  exports: [EndPointComponent],
})
export class EndPointModule {}
