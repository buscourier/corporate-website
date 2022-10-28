import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {AccountRoutingModule} from './account-routing.module'
import {IndexComponent} from './components/index/index.component'

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, AccountRoutingModule, TuiSvgModule, TuiButtonModule],
})
export class AccountModule {}
