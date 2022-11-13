import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputCountModule,
  TuiRadioListModule,
} from '@taiga-ui/kit'
import {CargoComponent} from './components/cargo/cargo.component'

@NgModule({
  declarations: [CargoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiRadioListModule,
    TuiInputCountModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiLetModule,
  ],
  exports: [CargoComponent],
})
export class CargoModule {}
