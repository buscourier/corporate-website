import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PickupPointsComponent} from './pickup-points.component'

@NgModule({
  declarations: [PickupPointsComponent],
  imports: [CommonModule],
  exports: [PickupPointsComponent],
})
export class PickupPointsModule {}
