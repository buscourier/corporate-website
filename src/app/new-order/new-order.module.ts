import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CalculatorModule} from './components/calculator/calculator.module'
import {CheckoutModule} from './components/checkout/checkout.module'
import {SidebarModule} from './components/sidebar/sidebar.module'
import {IndexComponent} from './index.component'
import {NewOrderRoutingModule} from './new-order-routing.module'
import {FailurePageGuard} from './shared/services/failure-page.guard'
import {NewOrderService} from './shared/services/new-order.service'
import {SuccessPageGuard} from './shared/services/success-page.guard'
import {SuccessModule} from './components/success/success.module'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    CalculatorModule,
    CheckoutModule, //TODO: Later remove checkout module
    TuiStepperModule,
    TuiButtonModule,
    SidebarModule,
    SuccessModule,
  ],
  providers: [NewOrderService, SuccessPageGuard, FailurePageGuard],
})
export class NewOrderModule {}
