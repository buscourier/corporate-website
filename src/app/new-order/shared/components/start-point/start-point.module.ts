import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
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
  ],
  exports: [StartPointComponent],
})
export class StartPointModule {}
