import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SendWebhookEffect} from './store/effects/send-webhook.effect'
import {SupportFormComponent} from './support-form.component'
import {ReactiveFormsModule} from '@angular/forms'
import {Store, StoreModule} from '@ngrx/store'
import {SUPPORT_FORM_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {EffectsModule} from '@ngrx/effects'
import {SendMessageEffect} from './store/effects/send-message.effect'
import {SiteService} from '../../services/site.service'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'

@NgModule({
  declarations: [SupportFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(SUPPORT_FORM_FEATURE, reducer),
    EffectsModule.forFeature([SendMessageEffect, SendWebhookEffect]),
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
    TuiTextAreaModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
  ],
  exports: [SupportFormComponent],
  providers: [SiteService],
})
export class SupportFormModule {}
