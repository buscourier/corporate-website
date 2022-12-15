import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ShopsComponent} from './shops.component'
import {ShopsRoutingModule} from './shops-routing.module'
import {PickupPointsModule} from './components/pickup-points/pickup-points.module'
import {SupportFormModule} from '../shared/components/support-form/support-form.module'

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    PickupPointsModule,
    SupportFormModule,
  ],
})
export class ShopsModule {}
