import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {StepFourComponent} from './components/checkout/components/step-four/step-four.component'
import {StepOneComponent} from './components/checkout/components/step-one/step-one.component'
import {StepThreeComponent} from './components/checkout/components/step-three/step-three.component'
import {StepTwoComponent} from './components/checkout/components/step-two/step-two.component'
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
        component: CheckoutComponent,
        children: [
          {
            path: '',
            component: StepOneComponent,
            pathMatch: 'full',
            canActivate: [],
          },
          {
            path: '1',
            component: StepTwoComponent,
            canActivate: [],
          },
          {
            path: '2',
            component: StepThreeComponent,
            canActivate: [],
          },
          {
            path: '3',
            component: StepFourComponent,
            canActivate: [],
          },
        ],
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
