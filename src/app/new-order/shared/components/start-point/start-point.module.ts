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
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiRadioListModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit'
import {ModalMapModule} from 'src/app/shared/components/modal-map/modal-map.module'
import {PatchFormGroupValuesModule} from '../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {SetControlValueModule} from '../../../../shared/directives/set-control-value/set-control-value.module'
import {StartPointComponent} from './start-point.component'
import {GetCitiesEffect} from './store/effects/get-cities.effect'
import {GetOfficesEffect} from './store/effects/get-offices.effect'
import {reducer} from './store/reducer'
import {START_POINT_FEATURE} from './store/state'
import {CourierModule} from '../courier/courier.module'

@NgModule({
  declarations: [StartPointComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(START_POINT_FEATURE, reducer),
    EffectsModule.forFeature([GetCitiesEffect, GetOfficesEffect]),
    TuiLetModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiSvgModule,
    TuiTabsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiRadioListModule,
    TuiInputDateModule,
    ReactiveFormsModule,
    SetControlValueModule,
    PatchFormGroupValuesModule,
    TuiComboBoxModule,
    ModalMapModule,
    CourierModule,
  ],
  exports: [StartPointComponent],
})
export class StartPointModule {}
