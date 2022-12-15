import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiSvgModule} from '@taiga-ui/core'
import {TuiAccordionModule, TuiInputModule} from '@taiga-ui/kit'
import {MapModule} from '../../../shared/components/map/map.module'
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
    TuiLetModule,
    MapModule,
    TuiSvgModule,
  ],
  exports: [PickupPointsComponent],
  providers: [OfficesService],
})
export class PickupPointsModule {}
