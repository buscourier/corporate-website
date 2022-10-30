import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EndPointComponent} from './components/end-point/end-point.component'
import {END_POINT_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {GetCitiesEffect} from './store/effects/get-cities.effect'
import {GetOfficesEffect} from './store/effects/get-offices.effect'

@NgModule({
  declarations: [EndPointComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(END_POINT_FEATURE, reducer),
    EffectsModule.forFeature([GetCitiesEffect, GetOfficesEffect]),
  ],
})
export class EndPointModule {}
