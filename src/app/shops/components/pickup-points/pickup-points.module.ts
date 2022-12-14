import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PickupPointsComponent} from './pickup-points.component'
import {PICKUP_POINTS_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {GetPointsEffect} from './store/effects/get-points.effect'
import {OfficesService} from '../../../shared/services/offices.service'

@NgModule({
  declarations: [PickupPointsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(PICKUP_POINTS_FEATURE, reducer),
    EffectsModule.forFeature([GetPointsEffect]),
  ],
  exports: [PickupPointsComponent],
  providers: [OfficesService],
})
export class PickupPointsModule {}
