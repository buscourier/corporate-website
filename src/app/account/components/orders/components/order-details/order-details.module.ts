import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {OrderDetailsComponent} from './components/order-details/order-details.component'
import {ORDER_DETAILS_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {GetOrderDetailsEffect} from './store/effects/get-order-details.effect'
import {CancelOrderEffect} from './store/effects/cancel-order.effect'
import {ORDER_DETAILS_PROVIDER} from './services/order-details.service'

@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(ORDER_DETAILS_FEATURE, reducer),
    EffectsModule.forFeature([GetOrderDetailsEffect, CancelOrderEffect]),
  ],
  exports: [OrderDetailsComponent],
  providers: [ORDER_DETAILS_PROVIDER],
})
export class OrderDetailsModule {}
