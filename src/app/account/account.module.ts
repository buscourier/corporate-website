import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IndexComponent} from './components/index/index.component'
import {AccountRoutingModule} from './account-routing.module'

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
