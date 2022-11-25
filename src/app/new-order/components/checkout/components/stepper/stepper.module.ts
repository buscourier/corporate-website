import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiSvgModule} from '@taiga-ui/core'
import {StepperComponent} from './stepper.component'

@NgModule({
  declarations: [StepperComponent],
  imports: [CommonModule, TuiSvgModule, TuiLetModule],
  exports: [StepperComponent],
})
export class StepperModule {}
