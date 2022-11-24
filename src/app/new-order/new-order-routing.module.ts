import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {CheckoutComponent} from './components/checkout/components/checkout/checkout.component'
import {StepOneComponent} from './components/checkout/components/step-one/components/step-one/step-one.component'
import {StepThreeComponent} from './components/checkout/components/step-three/components/step-three/step-three.component'
import {StepTwoComponent} from './components/checkout/components/step-two/step-two.component'
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
            component: StepThreeComponent,
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
