import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {IndexComponent} from './components/index/index.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: CalculatorComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderRoutingModule {}
