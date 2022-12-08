import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
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
import {GetBalanceEffect} from './store/effects/get-balance.effect'
import {GetUserProfileEffect} from './store/effects/get-user-profile.effect'
import {reducer} from './store/reducer'
import {ACCOUNT_FEATURE} from './store/state'

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
    TuiLoaderModule,
    TuiLetModule,
    TuiHintModule,
  ],
  providers: [AccountService, EntityGuard],
})
export class AccountModule {}
