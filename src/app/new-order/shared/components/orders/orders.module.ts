import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiLoaderModule} from '@taiga-ui/core'
import {TuiTagModule} from '@taiga-ui/kit'
import {PatchFormGroupValuesModule} from '../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {OrderModule} from '../order/order.module'
import {OrdersComponent} from './orders.component'

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiTagModule,
    TuiLetModule,
    OrderModule,
    TuiLoaderModule,
    PatchFormGroupValuesModule,
  ],
  exports: [OrdersComponent],
})
export class OrdersModule {}
