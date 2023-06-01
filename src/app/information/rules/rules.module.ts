import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {RulesRoutingModule} from './rules-routing.module'
import {RulesComponent} from './rules.component'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [RulesComponent],
  imports: [
    CommonModule,
    RulesRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiLetModule,
  ],
})
export class RulesModule {}
