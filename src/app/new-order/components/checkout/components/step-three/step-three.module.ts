import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterLink} from '@angular/router'
import {TuiButtonModule} from '@taiga-ui/core'
import {EndPointModule} from 'src/app/new-order/shared/components/end-point/end-point.module'
import {OrdersModule} from '../../../../shared/components/orders/orders.module'
import {StepThreeComponent} from './step-three.component'
import {RecipientModule} from './components/recipient/recipient.module'

@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CommonModule,
    EndPointModule,
    OrdersModule,
    RecipientModule,
    RouterLink,
    TuiButtonModule,
  ],
})
export class StepThreeModule {}
