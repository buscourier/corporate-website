import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {StepperComponent} from './stepper.component'

@NgModule({
  declarations: [StepperComponent],
  imports: [CommonModule, TuiSvgModule],
  exports: [StepperComponent],
})
export class StepperModule {}
