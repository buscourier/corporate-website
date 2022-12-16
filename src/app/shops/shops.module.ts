import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {TuiCarouselModule, TuiPaginationModule} from '@taiga-ui/kit'
import {ImgModule} from '../shared/components/img/img.module'
import {SupportFormModule} from '../shared/components/support-form/support-form.module'
import {PickupPointsModule} from './components/pickup-points/pickup-points.module'
import {ShopsRoutingModule} from './shops-routing.module'
import {ShopsComponent} from './shops.component'

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    PickupPointsModule,
    SupportFormModule,
    TuiCarouselModule,
    ImgModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiPaginationModule,
  ],
})
export class ShopsModule {}
