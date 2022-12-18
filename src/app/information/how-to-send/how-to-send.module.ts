import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {HowToSendRoutingModule} from './hot-to-send-routing.module'
import {HowToSendComponent} from './how-to-send.component'

@NgModule({
  declarations: [HowToSendComponent],
  imports: [
    CommonModule,
    HowToSendRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
  ],
})
export class HowToSendModule {}
