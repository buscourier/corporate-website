import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ShopsComponent} from './shops.component'
import {ShopsRoutingModule} from './shops-routing.module'
import {PickupPointsModule} from './components/pickup-points/pickup-points.module'

@NgModule({
  declarations: [ShopsComponent],
  imports: [CommonModule, ShopsRoutingModule, PickupPointsModule],
})
export class ShopsModule {}
