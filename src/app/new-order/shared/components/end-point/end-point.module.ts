import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiErrorModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioListModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import {PatchFormGroupValuesModule} from '../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {SetControlValueModule} from '../../../../shared/directives/set-control-value/set-control-value.module'
import {UtilsService} from '../../../../shared/services/utils.service'
import {CourierModule} from '../courier/courier.module'
import {EndPointComponent} from './end-point.component'

@NgModule({
  declarations: [EndPointComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiComboBoxModule,
    SetControlValueModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    PatchFormGroupValuesModule,
    TuiInputModule,
    TuiRadioListModule,
    TuiCheckboxLabeledModule,
    TuiSvgModule,
    CourierModule,
  ],
  exports: [EndPointComponent],
  providers: [UtilsService],
})
export class EndPointModule {}
