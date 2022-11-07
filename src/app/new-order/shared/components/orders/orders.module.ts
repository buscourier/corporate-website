import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiLoaderModule} from '@taiga-ui/core'
import {TuiTagModule} from '@taiga-ui/kit'
import {PatchFormGroupValuesModule} from '../../../../shared/directives/patch-form-group-values/patch-form-group-values.module'
import {OrderModule} from '../order/order.module'
import {OrdersComponent} from './components/orders/orders.component'
import {GetAllCargosEffect} from './store/effects/get-all-cargos.effect'
import {GetAllServicesEffect} from './store/effects/get-all-services.effect'
import {reducer} from './store/reducer'
import {ORDERS_FEATURE} from './store/state'

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiTagModule,
    TuiLetModule,
    OrderModule,
    StoreModule.forFeature(ORDERS_FEATURE, reducer),
    EffectsModule.forFeature([GetAllCargosEffect, GetAllServicesEffect]),
    TuiLoaderModule,
    PatchFormGroupValuesModule,
  ],
  exports: [OrdersComponent],
})
export class OrdersModule {}
