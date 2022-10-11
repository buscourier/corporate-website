import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {OrdersComponent} from './components/orders/orders.component'
import {OrdersService} from './services/orders.service'
import {StoreModule} from '@ngrx/store'
import {ORDERS_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {GetOrdersEffect} from './store/effects/get-orders.effect'
import {EffectsModule} from '@ngrx/effects'
import {OrdersRoutingModule} from './orders-routing.module'

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    StoreModule.forFeature(ORDERS_FEATURE, reducer),
    EffectsModule.forFeature([GetOrdersEffect]),
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
