import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {TuiButtonModule} from '@taiga-ui/core'
import {StartPointModule} from '../../../../shared/components/start-point/start-point.module'
import {StepTwoComponent} from './step-two.component'
import {SenderModule} from './components/sender/sender.module'

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    StartPointModule,
    SenderModule,
  ],
  exports: [StepTwoComponent],
})
export class StepTwoModule {}
