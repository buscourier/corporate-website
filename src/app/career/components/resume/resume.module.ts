import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ResumeComponent} from './resume.component'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {ReactiveFormsModule} from '@angular/forms'
import {SiteService} from '../../../shared/services/site.service'
import {StoreModule} from '@ngrx/store'
import {RESUME_FEATURE} from './store/state'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {SendMessageEffect} from './store/effects/send-message.effect'
import {SendWebhookEffect} from './store/effects/send-webhook.effect'

@NgModule({
  declarations: [ResumeComponent],
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiErrorModule,
    TuiTextAreaModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiInputPhoneModule,
    ReactiveFormsModule,
    StoreModule.forFeature(RESUME_FEATURE, reducers),
    EffectsModule.forFeature([SendMessageEffect, SendWebhookEffect]),
  ],
  providers: [SiteService],
})
export class ResumeModule {}
