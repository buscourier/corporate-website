import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {EndPointModule} from '../../shared/components/end-point/end-point.module'
import {OrdersModule} from '../../shared/components/orders/orders.module'
import {StartPointModule} from '../../shared/components/start-point/start-point.module'
import {CalculatorComponent} from './calculator.component'

//TODO think about need calculator module or not

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    StartPointModule,
    EndPointModule,
    OrdersModule,
    RouterModule,
  ],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
