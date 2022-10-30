import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {IndexComponent} from './components/index/index.component'
import {NewOrderRoutingModule} from './new-order-routing.module'
import {EndPointModule} from './shared/components/end-point/end-point.module'
import {StartPointModule} from './shared/components/start-point/start-point.module'
import {NewOrderService} from './shared/services/new-order.service'
import {CheckoutComponent} from './components/checkout/checkout.component'

@NgModule({
  declarations: [IndexComponent, CalculatorComponent, CheckoutComponent],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    StartPointModule,
    EndPointModule,
  ],
  providers: [NewOrderService],
})
export class NewOrderModule {}
