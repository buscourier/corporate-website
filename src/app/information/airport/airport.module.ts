import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {TuiCarouselModule, TuiPaginationModule} from '@taiga-ui/kit'
import {AirportRoutingModule} from './airport-routing.module'
import {AirportComponent} from './airport.component'

@NgModule({
  declarations: [AirportComponent],
  imports: [
    CommonModule,
    AirportRoutingModule,
    TuiSvgModule,
    TuiPaginationModule,
    TuiCarouselModule,
  ],
})
export class AirportModule {}
