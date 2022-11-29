import {ScrollingModule} from '@angular/cdk/scrolling'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiLoaderModule, TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core'
import {TuiPaginationModule} from '@taiga-ui/kit'
import {MobileDataModule} from 'src/app/shared/components/mobile-data/mobile-data.module'
import {LetModule} from 'src/app/shared/directives/let/let.module'
import {FilterModule} from './components/filter/filter.module'
import {OrderDetailsModule} from './components/order-details/order-details.module'
import {OrdersComponent} from './components/orders/orders.component'
import {OrdersRoutingModule} from './orders-routing.module'
import {OrdersService} from './services/orders.service'
import {GetOrdersEffect} from './store/effects/get-orders.effect'
import {reducer} from './store/reducer'
import {ORDERS_FEATURE} from './store/state'

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    LetModule,
    FilterModule,
    StoreModule.forFeature(ORDERS_FEATURE, reducer),
    EffectsModule.forFeature([GetOrdersEffect]),
    TuiTableModule,
    TuiTablePaginationModule,
    TuiLoaderModule,
    TuiCurrencyPipeModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiLetModule,
    TuiPaginationModule,
    MobileDataModule,
    ScrollingModule,
    OrderDetailsModule,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
