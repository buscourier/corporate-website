import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {AccountRoutingModule} from './account-routing.module'
import {AccountComponent} from './account.component'
import {AccountService} from './services/account.service'

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, TuiSvgModule, TuiButtonModule],
  providers: [AccountService],
})
export class AccountModule {}
