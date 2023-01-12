import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CheckoutComponent} from './checkout.component'
import {StepFourComponent} from './components/step-four/step-four.component'
import {StepOneComponent} from './components/step-one/step-one.component'
import {StepThreeComponent} from './components/step-three/step-three.component'
import {StepTwoComponent} from './components/step-two/step-two.component'
import {StepGuard} from './services/step.guard'
import {FailureComponent} from './components/failure/failure.component'
import {FailurePageGuard} from '../../shared/services/failure-page.guard'

const routes: Routes = [
  {
    path: '',
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
        canActivate: [StepGuard],
      },
      {
        path: '2',
        component: StepThreeComponent,
        canActivate: [StepGuard],
      },
      {
        path: '3',
        component: StepFourComponent,
        canActivate: [StepGuard],
      },
      {
        path: 'failure',
        component: FailureComponent,
        canActivate: [FailurePageGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
