import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {TuiCarouselModule, TuiPaginationModule} from '@taiga-ui/kit'
import {AirportComponent} from './airport.component'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [AirportComponent],
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiPaginationModule,
    TuiCarouselModule,
    TuiLetModule,
  ],
})
export class AirportModule {}
