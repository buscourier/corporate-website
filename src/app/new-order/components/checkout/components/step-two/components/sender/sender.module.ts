import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiErrorModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TextMaskModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {PatchFormGroupValuesModule} from '../../../../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {ConfidantsService} from '../../../../../../../shared/services/confidants.service'
import {SenderComponent} from './sender.component'
import {GetConfidantsEffect} from './store/effects/get-confidants.effect'
import {reducer} from './store/reducer'
import {SENDER_FEATURE} from './store/state'

@NgModule({
  declarations: [SenderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(SENDER_FEATURE, reducer),
    EffectsModule.forFeature([GetConfidantsEffect]),
    TuiInputPhoneModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    PatchFormGroupValuesModule,
    TextMaskModule,
    TuiLoaderModule,
    TuiLetModule,
  ],
  exports: [SenderComponent],
  providers: [ConfidantsService],
})
export class SenderModule {}
