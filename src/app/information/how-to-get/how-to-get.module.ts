import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {HowToGetRoutingModule} from './hot-to-get-routing.module'
import {HowToGetComponent} from './how-to-get.component'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [HowToGetComponent],
  imports: [
    CommonModule,
    HowToGetRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiLoaderModule,
    TuiLetModule,
  ],
})
export class HowToGetModule {}
