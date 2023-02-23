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
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiRadioListModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit'
import {ModalMapModule} from 'src/app/shared/components/modal-map/modal-map.module'
import {PatchFormGroupValuesModule} from '../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {SetControlValueModule} from '../../../../shared/directives/set-control-value/set-control-value.module'
import {CourierModule} from '../courier/courier.module'
import {StartPointComponent} from './start-point.component'

@NgModule({
  declarations: [StartPointComponent],
  imports: [
    CommonModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiSvgModule,
    TuiTabsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiRadioListModule,
    TuiInputDateModule,
    ReactiveFormsModule,
    SetControlValueModule,
    PatchFormGroupValuesModule,
    TuiComboBoxModule,
    ModalMapModule,
    CourierModule,
  ],
  exports: [StartPointComponent],
})
export class StartPointModule {}
