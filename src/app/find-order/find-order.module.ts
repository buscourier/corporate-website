import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiInputModule} from '@taiga-ui/kit'
import {FindOrderRoutingModule} from './find-order-routing.module'
import {FindOrderComponent} from './find-order.component'
import {FindOrderService} from './services/find-order.service'
import {GetStatusesEffect} from './store/effects/get-statuses.effect'
import {reducer} from './store/reducer'
import {FIND_ORDER_FEATURE} from './store/state'

@NgModule({
  declarations: [FindOrderComponent],
  imports: [
    CommonModule,
    FindOrderRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    StoreModule.forFeature(FIND_ORDER_FEATURE, reducer),
    EffectsModule.forFeature([GetStatusesEffect]),
    TuiLoaderModule,
    TuiLetModule,
  ],
  providers: [FindOrderService],
})
export class FindOrderModule {}
