import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiRadioListModule,
} from '@taiga-ui/kit'
import {CargoComponent} from './components/cargo/components/cargo/cargo.component'
import {OrderComponent} from './components/order/order.component'

@NgModule({
  declarations: [OrderComponent, CargoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiRadioListModule,
    TuiLetModule,
    TuiInputCountModule,
  ],
  exports: [OrderComponent],
})
export class OrderModule {}
