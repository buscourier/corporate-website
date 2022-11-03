import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {TuiButtonModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {EndPointModule} from '../../shared/components/end-point/end-point.module'
import {StartPointModule} from '../../shared/components/start-point/start-point.module'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {PersonModule} from './components/person/person.module'
import {StepOneComponent} from './components/step-one/step-one.component'
import {StepThreeComponent} from './components/step-three/step-three.component'
import {StepTwoComponent} from './components/step-two/step-two.component'
import {StepFourComponent} from './components/step-four/step-four.component'

@NgModule({
  declarations: [
    CheckoutComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StartPointModule,
    EndPointModule,
    PersonModule,
    TuiStepperModule,
    TuiButtonModule,
  ],
  // providers: [NewOrderService],
})
export class CheckoutModule {}
