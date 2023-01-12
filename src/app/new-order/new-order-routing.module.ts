import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {IndexComponent} from './index.component'
import {SuccessComponent} from './components/success/success.component'
import {SuccessPageGuard} from './shared/services/success-page.guard'

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
  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [SuccessPageGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderRoutingModule {}
