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
import {TuiLoaderModule, TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'
import {FilterModule} from './components/filter/filter.module'
import {ScrollingModule} from '@angular/cdk/scrolling'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {BaseUrlInterceptor} from '../../../shared/interceptors/base-url/base-url.interceptor'
import {TuiPaginationModule} from '@taiga-ui/kit'
import {MobileDataModule} from 'src/app/shared/components/mobile-data/mobile-data.module'

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
    TuiPaginationModule,
    MobileDataModule,
    ScrollingModule,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
