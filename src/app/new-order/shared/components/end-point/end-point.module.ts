import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
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
  ],
  exports: [EndPointComponent],
})
export class EndPointModule {}
