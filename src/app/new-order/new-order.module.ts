import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CalculatorModule} from './components/calculator/calculator.module'
import {CheckoutModule} from './components/checkout/checkout.module'
import {PersonModule} from './components/checkout/components/person/person.module'
import {IndexComponent} from './components/index/index.component'
import {NewOrderRoutingModule} from './new-order-routing.module'
import {NewOrderService} from './shared/services/new-order.service'

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    CalculatorModule,
    CheckoutModule,
    TuiStepperModule,
    TuiButtonModule,
    PersonModule,
  ],
  providers: [NewOrderService],
})
export class NewOrderModule {}
