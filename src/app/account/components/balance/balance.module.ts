import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {BalanceComponent} from './balance.component'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule, TuiHintModule, TuiLoaderModule} from '@taiga-ui/core'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'
import {StoreModule} from '@ngrx/store'
import {BALANCE_FEATURE} from './store/state'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {GetBalanceEffect} from './store/effects/get-balance.effect'
import {AccountService} from '../../services/account.service'

@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiCurrencyPipeModule,
    TuiHintModule,
    StoreModule.forFeature(BALANCE_FEATURE, reducers),
    EffectsModule.forFeature([GetBalanceEffect]),
    TuiButtonModule,
  ],
  exports: [BalanceComponent],
  providers: [AccountService],
})
export class BalanceModule {}
