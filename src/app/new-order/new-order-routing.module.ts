import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {IndexComponent} from './index.component'

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
        loadChildren: () =>
          import('./components/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderRoutingModule {}
