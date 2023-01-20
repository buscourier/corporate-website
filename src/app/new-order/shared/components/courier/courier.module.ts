import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CourierComponent} from './courier.component'
import {ReactiveFormsModule} from '@angular/forms'
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioListModule,
} from '@taiga-ui/kit'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'

@NgModule({
  declarations: [CourierComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiRadioListModule,
  ],
  exports: [CourierComponent],
})
export class CourierModule {}
