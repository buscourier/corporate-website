import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiButtonModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiInputNumberModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit'
import {ServicesComponent} from './component/services.component'

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiCheckboxLabeledModule,
    TuiInputPhoneModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
  ],
  exports: [ServicesComponent],
})
export class ServicesModule {}
