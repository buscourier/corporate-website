import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IndexComponent} from './components/index/index.component'
import {AccountRoutingModule} from './account-routing.module'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, AccountRoutingModule, TuiSvgModule, TuiButtonModule],
})
export class AccountModule {}
