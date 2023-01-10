import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SuccessComponent} from './success.component'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [SuccessComponent],
  imports: [CommonModule, TuiSvgModule, TuiButtonModule],
  exports: [SuccessComponent],
})
export class SuccessModule {}
