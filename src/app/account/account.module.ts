import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {AccountRoutingModule} from './account-routing.module'
import {AccountComponent} from './account.component'
import {AccountService} from './services/account.service'
import {StoreModule} from '@ngrx/store'
import {ACCOUNT_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {EffectsModule} from '@ngrx/effects'
import {GetUserProfileEffect} from './store/effects/get-user-profile.effect'
import {GetBalanceEffect} from './store/effects/get-balance.effect'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    StoreModule.forFeature(ACCOUNT_FEATURE, reducer),
    EffectsModule.forFeature([GetUserProfileEffect, GetBalanceEffect]),
    TuiSvgModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
  ],
  providers: [AccountService],
})
export class AccountModule {}
