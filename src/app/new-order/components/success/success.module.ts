import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SuccessComponent} from './success.component'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {RouterModule} from '@angular/router'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [SuccessComponent],
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiButtonModule,
    RouterModule,
    TuiLetModule,
  ],
  exports: [SuccessComponent],
})
export class SuccessModule {}
