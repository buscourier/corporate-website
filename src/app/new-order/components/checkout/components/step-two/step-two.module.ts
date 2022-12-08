import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule} from '@taiga-ui/core'
import {StartPointModule} from '../../../../shared/components/start-point/start-point.module'
import {SenderModule} from './components/sender/sender.module'
import {StepTwoComponent} from './step-two.component'

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    StartPointModule,
    SenderModule,
    TuiLetModule,
  ],
  exports: [StepTwoComponent],
})
export class StepTwoModule {}
