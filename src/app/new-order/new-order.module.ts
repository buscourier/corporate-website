import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CalculatorModule} from './components/calculator/calculator.module'
import {CheckoutModule} from './components/checkout/checkout.module'
import {ValidateGuard} from './components/checkout/services/validate.guard'
import {SidebarModule} from './components/sidebar/sidebar.module'
import {IndexComponent} from './index.component'
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
    SidebarModule,
  ],
  providers: [NewOrderService, ValidateGuard],
})
export class NewOrderModule {}
