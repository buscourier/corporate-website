import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiRadioListModule,
} from '@taiga-ui/kit'
import {CargoComponent} from './components/cargo/cargo.component'
import {ParcelComponent} from './components/parcel/parcel.component'
import {ParcelsComponent} from './components/parcels/parcels.component'

@NgModule({
  declarations: [CargoComponent, ParcelsComponent, ParcelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiRadioListModule,
    TuiInputCountModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiLetModule,
    TuiInputModule,
    TuiButtonModule,
    TuiInputNumberModule,
  ],
  exports: [CargoComponent],
})
export class CargoModule {}
