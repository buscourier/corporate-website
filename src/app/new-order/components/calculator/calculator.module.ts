import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {EndPointModule} from '../../shared/components/end-point/end-point.module'
import {StartPointModule} from '../../shared/components/start-point/start-point.module'
import {CalculatorComponent} from './calculator.component'

@NgModule({
  declarations: [CalculatorComponent],
  imports: [CommonModule, StartPointModule, EndPointModule, RouterModule],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
