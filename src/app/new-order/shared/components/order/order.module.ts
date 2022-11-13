import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioListModule,
} from '@taiga-ui/kit'
import {OrderComponent} from './components/order/order.component'

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiRadioListModule,
    TuiLetModule,
  ],
  exports: [OrderComponent],
})
export class OrderModule {}
