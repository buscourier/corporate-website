import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {CourierRoutingModule} from './courier-routing.module'
import {CourierComponent} from './courier.component'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [CourierComponent],
  imports: [CommonModule, CourierRoutingModule, TuiSvgModule, TuiLetModule],
})
export class CourierModule {}
