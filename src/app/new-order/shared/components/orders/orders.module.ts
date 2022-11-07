import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiTagModule} from '@taiga-ui/kit'
import {OrderModule} from '../order/order.module'
import {OrdersComponent} from './components/orders/orders.component'

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, ReactiveFormsModule, TuiTagModule, OrderModule],
  exports: [OrdersComponent],
})
export class OrdersModule {}
