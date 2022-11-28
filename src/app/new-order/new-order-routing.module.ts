import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {FailureComponent} from './components/failure/failure.component'
import {SuccessComponent} from './components/success/success.component'
import {IndexComponent} from './index.component'
import {FailurePageGuard} from './shared/services/failure-page.guard'
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
  {
    path: 'failure',
    component: FailureComponent,
    canActivate: [FailurePageGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderRoutingModule {}
