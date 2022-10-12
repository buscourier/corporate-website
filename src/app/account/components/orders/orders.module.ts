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
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table'
import {LetModule} from 'src/app/shared/directives/let/let.module'
import {TuiLoaderModule} from '@taiga-ui/core'

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    LetModule,
    StoreModule.forFeature(ORDERS_FEATURE, reducer),
    EffectsModule.forFeature([GetOrdersEffect]),
    TuiTableModule,
    TuiTablePaginationModule,
    TuiLoaderModule,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
