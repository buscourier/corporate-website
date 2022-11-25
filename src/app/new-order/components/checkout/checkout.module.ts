import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiSvgModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CheckoutComponent} from './checkout.component'
import {StepFourModule} from './components/step-four/step-four.module'
import {StepOneModule} from './components/step-one/step-one.module'
import {StepThreeModule} from './components/step-three/step-three.module'
import {StepTwoModule} from './components/step-two/step-two.module'
import {StepperModule} from './components/stepper/stepper.module'
import {SendOrderEffect} from './store/effects/send-order.effect'
import {reducer} from './store/reducer'
import {CHECKOUT_FEATURE} from './store/state'

//TODO: Think need StepOne, StepTwo, StepThree, StepFour modules or not

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(CHECKOUT_FEATURE, reducer),
    EffectsModule.forFeature([SendOrderEffect]),
    StepOneModule,
    StepTwoModule,
    StepThreeModule,
    StepFourModule,
    TuiStepperModule,
    TuiSvgModule,
    StepperModule,
  ],
})
export class CheckoutModule {}
