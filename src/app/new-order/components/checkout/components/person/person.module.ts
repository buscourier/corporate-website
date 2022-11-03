import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store'
import {TuiCardModule, TuiMoneyModule} from '@taiga-ui/addon-commerce'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit'
import {PatchFormGroupValuesModule} from '../../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {PersonComponent} from './components/person/person.component'
import {reducer} from './store/reducer'
import {PERSON_FEATURE} from './store/state'

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
    TuiDataListWrapperModule,
    TuiMultiSelectModule,
    TuiMoneyModule,
    TuiCardModule,
    TuiButtonModule,
  ],
  exports: [PersonComponent],
})
export class PersonModule {}
