import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {TuiStepperModule} from '@taiga-ui/kit'
import {EndPointModule} from '../../shared/components/end-point/end-point.module'
import {StartPointModule} from '../../shared/components/start-point/start-point.module'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {PersonModule} from './components/person/person.module'
import {StepFourComponent} from './components/step-four/step-four.component'
import {StepOneModule} from './components/step-one/step-one.module'
import {StepThreeComponent} from './components/step-three/step-three.component'
import {StepTwoComponent} from './components/step-two/step-two.component'

@NgModule({
  declarations: [
    CheckoutComponent,
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
    StepOneModule,
    TuiStepperModule,
  ],
  // providers: [NewOrderService],
})
export class CheckoutModule {}
