import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SetControlValueDirective} from './set-control-value.directive'

@NgModule({
  declarations: [SetControlValueDirective],
  imports: [CommonModule],
  exports: [SetControlValueDirective],
})
export class SetControlValueModule {}
