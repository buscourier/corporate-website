import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiRadioListModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {LetModule} from '../../../../../../shared/directives/let/let.module'
import {AutoPartsComponent} from './components/auto-parts/auto-parts.component'
import {CargoComponent} from './components/cargo/cargo.component'
import {ParcelComponent} from './components/parcel/parcel.component'
import {ParcelsComponent} from './components/parcels/parcels.component'

@NgModule({
  declarations: [
    CargoComponent,
    ParcelsComponent,
    ParcelComponent,
    AutoPartsComponent,
  ],
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
    TuiLoaderModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    LetModule,
  ],
  exports: [CargoComponent],
})
export class CargoModule {}
