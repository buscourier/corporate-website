import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiSvgModule} from '@taiga-ui/core'
import {TuiStepperModule} from '@taiga-ui/kit'
import {CheckoutRoutingModule} from './checkout-routing.module'
import {CheckoutComponent} from './checkout.component'
import {StepFourModule} from './components/step-four/step-four.module'
import {StepOneModule} from './components/step-one/step-one.module'
import {StepThreeModule} from './components/step-three/step-three.module'
import {StepTwoModule} from './components/step-two/step-two.module'
import {StepperModule} from './components/stepper/stepper.module'
import {StepGuard} from './services/step.guard'
import {SendOrderEffect} from './store/effects/send-order.effect'
import {reducer} from './store/reducer'
import {CHECKOUT_FEATURE} from './store/state'
import {FailureModule} from './components/failure/failure.module'
import {SendWebhookEffect} from './store/effects/send-webhook.effect'

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    StoreModule.forFeature(CHECKOUT_FEATURE, reducer),
    EffectsModule.forFeature([SendOrderEffect, SendWebhookEffect]),
    StepOneModule,
    StepTwoModule,
    StepThreeModule,
    StepFourModule,
    TuiStepperModule,
    FailureModule,
    TuiSvgModule,
    StepperModule,
  ],
  exports: [CheckoutComponent],
  providers: [StepGuard],
})
export class CheckoutModule {}
