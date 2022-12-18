import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {ActionsRoutingModule} from './actions-routing.module'
import {ActionsComponent} from './actions.component'

@NgModule({
  declarations: [ActionsComponent],
  imports: [CommonModule, ActionsRoutingModule, TuiSvgModule],
})
export class ActionsModule {}
