import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {StepFourComponent} from './components/step-four/step-four.component'
import {StepOneModule} from './components/step-one/step-one.module'
import {StepThreeModule} from './components/step-three/step-three.module'
import {StepTwoModule} from './components/step-two/step-two.module'

//TODO: Think need StepOne, StepTwo, StepThree, StepFour modules or not

@NgModule({
  declarations: [CheckoutComponent, StepFourComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StepOneModule,
    StepTwoModule,
    StepThreeModule,
    TuiStepperModule,
  ],
  // providers: [NewOrderService],
})
export class CheckoutModule {}
