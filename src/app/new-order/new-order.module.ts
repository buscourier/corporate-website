import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {CheckoutModule} from './components/checkout/checkout.module'
import {PersonModule} from './components/checkout/components/person/person.module'
import {IndexComponent} from './components/index/index.component'
import {NewOrderRoutingModule} from './new-order-routing.module'
import {EndPointModule} from './shared/components/end-point/end-point.module'
import {StartPointModule} from './shared/components/start-point/start-point.module'
import {NewOrderService} from './shared/services/new-order.service'

@NgModule({
  declarations: [IndexComponent, CalculatorComponent],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    StartPointModule,
    EndPointModule,
    CheckoutModule,
    TuiStepperModule,
    TuiButtonModule,
    PersonModule,
  ],
  providers: [NewOrderService],
})
export class NewOrderModule {}
