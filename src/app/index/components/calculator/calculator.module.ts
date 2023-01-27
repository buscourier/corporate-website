import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CalculatorComponent} from './calculator.component'
import {ReactiveFormsModule} from '@angular/forms'
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {StoreModule} from '@ngrx/store'
import {reducer} from './store/reducer'
import {EffectsModule} from '@ngrx/effects'
import {GetStartCitiesEffect} from './store/effects/get-start-cities.effect'
import {GetEndCitiesEffect} from './store/effects/get-end-cities.effect'
import {TuiLetModule} from '@taiga-ui/cdk'
import {CitiesService} from '../../../shared/services/cities.service'
import {CALCULATOR_FEATURE} from './store/state'

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiLoaderModule,
    TuiSelectModule,
    StoreModule.forFeature(CALCULATOR_FEATURE, reducer),
    EffectsModule.forFeature([GetStartCitiesEffect, GetEndCitiesEffect]),
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiLetModule,
    TuiButtonModule,
    TuiComboBoxModule,
  ],
  exports: [CalculatorComponent],
  providers: [CitiesService],
})
export class CalculatorModule {}
