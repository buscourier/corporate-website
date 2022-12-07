import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SenderComponent} from './sender.component'
import {SENDER_FEATURE} from './store/state'
import {StoreModule} from '@ngrx/store'
import {reducer} from './store/reducer'
import {
  TextMaskModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {PatchFormGroupValuesModule} from '../../../../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [SenderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(SENDER_FEATURE, reducer),
    TuiInputPhoneModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    PatchFormGroupValuesModule,
    TextMaskModule,
  ],
  exports: [SenderComponent],
})
export class SenderModule {}
