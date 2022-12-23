import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core'
import {ReportService} from '../../services/report.service'
import {CancelOrderEffect} from './store/effects/cancel-order.effect'
import {reducer} from './store/reducer'
import {VIEW_ORDER_FEATURE} from './store/state'
import {ViewOrderComponent} from './view-order.component'

@NgModule({
  declarations: [ViewOrderComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(VIEW_ORDER_FEATURE, reducer),
    EffectsModule.forFeature([CancelOrderEffect]),
    TuiButtonModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiScrollbarModule,
  ],
  providers: [ReportService],
})
export class ViewOrderModule {}
