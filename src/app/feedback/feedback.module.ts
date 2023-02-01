import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiRadioListModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {SiteService} from '../shared/services/site.service'
import {FeedbackRoutingModule} from './feedback-routing.module'
import {FeedbackComponent} from './feedback.component'
import {SendMessageEffect} from './store/effects/send-message.effect'
import {SendWebhookEffect} from './store/effects/send-webhook.effect'
import {reducer} from './store/reducer'
import {FEEDBACK_FEATURE} from './store/state'

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    StoreModule.forFeature(FEEDBACK_FEATURE, reducer),
    EffectsModule.forFeature([SendMessageEffect, SendWebhookEffect]),
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputPhoneModule,
    TuiTextAreaModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
    TuiRadioListModule,
  ],
  providers: [SiteService],
})
export class FeedbackModule {}
