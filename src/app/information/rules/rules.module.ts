import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {RulesRoutingModule} from './rules-routing.module'
import {RulesComponent} from './rules.component'

@NgModule({
  declarations: [RulesComponent],
  imports: [CommonModule, RulesRoutingModule, TuiSvgModule],
})
export class RulesModule {}
