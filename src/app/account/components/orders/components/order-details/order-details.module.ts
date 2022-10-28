import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'

import {StoreModule} from '@ngrx/store'

import {OrderDetailsComponent} from './components/order-details/order-details.component'
import {ORDER_DETAILS_PROVIDER} from './services/order-details.service'
import {CancelOrderEffect} from './store/effects/cancel-order.effect'
import {GetOrderDetailsEffect} from './store/effects/get-order-details.effect'
import {reducer} from './store/reducer'
import {ORDER_DETAILS_FEATURE} from './store/state'

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
