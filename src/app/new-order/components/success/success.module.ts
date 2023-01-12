import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SuccessComponent} from './success.component'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [SuccessComponent],
  imports: [CommonModule, TuiSvgModule, TuiButtonModule, RouterModule],
  exports: [SuccessComponent],
})
export class SuccessModule {}
