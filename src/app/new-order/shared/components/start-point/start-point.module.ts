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
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiRadioListModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit'
import {SetControlValueModule} from '../../../../shared/directives/set-control-value/set-control-value.module'
import {StartPointComponent} from './components/start-point/start-point.component'
import {GetCitiesEffect} from './store/effects/get-cities.effect'
import {GetOfficesEffect} from './store/effects/get-offices.effect'
import {reducer} from './store/reducer'
import {START_POINT_FEATURE} from './store/state'

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
  ],
  exports: [StartPointComponent],
})
export class StartPointModule {}
