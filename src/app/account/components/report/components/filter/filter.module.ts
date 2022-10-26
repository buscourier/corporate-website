import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StoreModule} from '@ngrx/store'
import {reducer} from './store/reducer'
import {EffectsModule} from '@ngrx/effects'
import {GetStartCitiesEffect} from './store/effects/get-start-cities.effect'
import {GetEndCitiesEffect} from './store/effects/get-end-cities.effect'
import {FilterComponent} from './components/filter/filter.component'
import {
  TuiDataListWrapperModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {FilterService} from './services/filter.service'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {LetModule} from 'src/app/shared/directives/let/let.module'
import {DisableControlModule} from 'src/app/shared/directives/disable-control/disable-control.module'
import {REPORT_FILTER_FEATURE} from './store/state'

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiSelectModule,
    TuiLabelModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiDataListModule,
    LetModule,
    DisableControlModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    StoreModule.forFeature(REPORT_FILTER_FEATURE, reducer),
    EffectsModule.forFeature([GetStartCitiesEffect, GetEndCitiesEffect]),
  ],
  exports: [FilterComponent],
  providers: [FilterService],
})
export class FilterModule {}
