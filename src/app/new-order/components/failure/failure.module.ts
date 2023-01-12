import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FailureComponent} from './failure.component'
import {RouterModule} from '@angular/router'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [FailureComponent],
  imports: [CommonModule, RouterModule, TuiSvgModule, TuiButtonModule],
  exports: [FailureComponent],
})
export class FailureModule {}
