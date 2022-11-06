import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {PersonModule} from './components/person/person.module'
import {StepFourComponent} from './components/step-four/step-four.component'
import {StepOneModule} from './components/step-one/step-one.module'
import {StepThreeComponent} from './components/step-three/step-three.component'
import {StepTwoModule} from './components/step-two/step-two.module'

@NgModule({
  declarations: [CheckoutComponent, StepThreeComponent, StepFourComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PersonModule,
    StepOneModule,
    StepTwoModule,
    TuiStepperModule,
  ],
  // providers: [NewOrderService],
})
export class CheckoutModule {}
