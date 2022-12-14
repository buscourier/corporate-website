import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiAccordionModule, TuiInputModule} from '@taiga-ui/kit'
import {OfficesService} from '../../../shared/services/offices.service'
import {PickupPointsComponent} from './pickup-points.component'
import {GetDepartmentsEffect} from './store/effects/get-departments.effect'
import {reducer} from './store/reducer'
import {PICKUP_POINTS_FEATURE} from './store/state'

@NgModule({
  declarations: [PickupPointsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(PICKUP_POINTS_FEATURE, reducer),
    EffectsModule.forFeature([GetDepartmentsEffect]),
    TuiInputModule,
    TuiAccordionModule,
  ],
  exports: [PickupPointsComponent],
  providers: [OfficesService],
})
export class PickupPointsModule {}
