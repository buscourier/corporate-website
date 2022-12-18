import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {HowToGetRoutingModule} from './hot-to-get-routing.module'
import {HowToGetComponent} from './how-to-get.component'

@NgModule({
  declarations: [HowToGetComponent],
  imports: [CommonModule, HowToGetRoutingModule, TuiSvgModule, TuiButtonModule],
})
export class HowToGetModule {}
