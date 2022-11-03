import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {PatchFormGroupValuesDirective} from './patch-form-group-values.directive'

@NgModule({
  declarations: [PatchFormGroupValuesDirective],
  imports: [CommonModule],
  exports: [PatchFormGroupValuesDirective],
})
export class PatchFormGroupValuesModule {}
