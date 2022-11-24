import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {StepFourComponent} from './components/checkout/components/step-four/step-four.component'
import {StepOneComponent} from './components/checkout/components/step-one/step-one.component'
import {StepThreeComponent} from './components/checkout/components/step-three/step-three.component'
import {StepTwoComponent} from './components/checkout/components/step-two/step-two.component'
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
        component: CheckoutComponent,
        children: [
          {
            path: '',
            component: StepOneComponent,
            pathMatch: 'full',
          },
          {
            path: '1',
            component: StepTwoComponent,
          },
          {
            path: '2',
            component: StepThreeComponent,
          },
          {
            path: '3',
            component: StepFourComponent,
          },
        ],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderRoutingModule {}
