import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PersonComponent} from './person.component'
import {StoreModule} from '@ngrx/store'
import {PERSON_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {ReactiveFormsModule} from '@angular/forms'
import {PatchFormGroupValuesModule} from '../../../../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'

@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(PERSON_FEATURE, reducer),
    PatchFormGroupValuesModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
  ],
  exports: [PersonComponent],
})
export class PersonModule {}
