import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {AlertComponent} from './alert.component'

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, TuiButtonModule, TuiSvgModule],
  exports: [AlertComponent],
})
export class AlertModule {}
