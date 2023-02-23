import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {CitiesService} from '../../../shared/services/cities.service'
import {CalculatorComponent} from './calculator.component'

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiLetModule,
    TuiButtonModule,
    TuiComboBoxModule,
  ],
  exports: [CalculatorComponent],
  providers: [CitiesService],
})
export class CalculatorModule {}
