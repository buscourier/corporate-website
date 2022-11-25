import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {TuiSvgModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CheckoutComponent} from './checkout.component'
import {StepFourModule} from './components/step-four/step-four.module'
import {StepOneModule} from './components/step-one/step-one.module'
import {StepThreeModule} from './components/step-three/step-three.module'
import {StepTwoModule} from './components/step-two/step-two.module'

//TODO: Think need StepOne, StepTwo, StepThree, StepFour modules or not

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StepOneModule,
    StepTwoModule,
    StepThreeModule,
    StepFourModule,
    TuiStepperModule,
    TuiSvgModule,
  ],
  // providers: [NewOrderService],
})
export class CheckoutModule {}
