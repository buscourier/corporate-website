import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RecipientComponent} from './recipient.component'
import {StoreModule} from '@ngrx/store'
import {RECIPIENT_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {ReactiveFormsModule} from '@angular/forms'
import {PatchFormGroupValuesModule} from '../../../../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'

@NgModule({
  declarations: [RecipientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(RECIPIENT_FEATURE, reducer),
    PatchFormGroupValuesModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
  ],
  exports: [RecipientComponent],
})
export class RecipientModule {}
