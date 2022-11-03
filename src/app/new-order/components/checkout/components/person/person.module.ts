import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit'
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
  ],
  exports: [PersonComponent],
})
export class PersonModule {}
