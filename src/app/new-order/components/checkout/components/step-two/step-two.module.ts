import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {TuiButtonModule} from '@taiga-ui/core'
import {StartPointModule} from '../../../../shared/components/start-point/start-point.module'
import {StepTwoComponent} from './components/step-two/step-two.component'

@NgModule({
  declarations: [StepTwoComponent],
  imports: [CommonModule, RouterModule, TuiButtonModule, StartPointModule],
  exports: [StepTwoComponent],
})
export class StepTwoModule {}
