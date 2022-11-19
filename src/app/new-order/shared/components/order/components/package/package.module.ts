import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {PackageComponent} from './components/package/package.component'
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiCheckboxLabeledModule, TuiInputCountModule} from '@taiga-ui/kit'

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    TuiDialogModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiCheckboxLabeledModule,
    TuiInputCountModule,
    TuiTextfieldControllerModule,
  ],
  exports: [PackageComponent],
})
export class PackageModule {}
