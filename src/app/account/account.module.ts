import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiSvgModule,
} from '@taiga-ui/core'
import {AccountRoutingModule} from './account-routing.module'
import {AccountComponent} from './account.component'
import {AccountService} from './services/account.service'
import {EntityGuard} from './services/entity.guard'
import {BalanceModule} from './components/balance/balance.module'

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiLoaderModule,
    TuiLetModule,
    TuiHintModule,
    BalanceModule,
  ],
  providers: [AccountService, EntityGuard],
})
export class AccountModule {}
