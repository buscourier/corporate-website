import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiDataListWrapperModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {DisableControlModule} from 'src/app/shared/directives/disable-control/disable-control.module'
import {LetModule} from 'src/app/shared/directives/let/let.module'
import {FilterComponent} from './components/filter/filter.component'
import {FilterService} from './services/filter.service'
import {GetEndCitiesEffect} from './store/effects/get-end-cities.effect'
import {GetStartCitiesEffect} from './store/effects/get-start-cities.effect'
import {reducer} from './store/reducer'
import {FILTER_FEATURE} from './store/state'

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
    StoreModule.forFeature(FILTER_FEATURE, reducer),
    EffectsModule.forFeature([GetStartCitiesEffect, GetEndCitiesEffect]),
  ],
  exports: [FilterComponent],
  providers: [FilterService],
})
export class FilterModule {}
