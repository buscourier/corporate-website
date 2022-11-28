import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CheckoutComponent} from './checkout.component'
import {StepFourComponent} from './components/step-four/step-four.component'
import {StepOneComponent} from './components/step-one/step-one.component'
import {StepThreeComponent} from './components/step-three/step-three.component'
import {StepTwoComponent} from './components/step-two/step-two.component'

const routes: Routes = [
  {
    path: '',
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
