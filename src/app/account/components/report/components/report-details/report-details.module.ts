import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'

import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {ReportDetailsComponent} from './components/report-details/report-details.component'
import {ORDER_DETAILS_PROVIDER} from './services/report-details.service'
import {CancelOrderEffect} from './store/effects/cancel-order.effect'
import {GetOrderEffect} from './store/effects/get-order.effect'

import {reducer} from './store/reducer'
import {REPORT_DETAILS_FEATURE} from './store/state'

@NgModule({
  declarations: [ReportDetailsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(REPORT_DETAILS_FEATURE, reducer),
    EffectsModule.forFeature([GetOrderEffect, CancelOrderEffect]),
    TuiButtonModule,
    TuiLoaderModule,
    TuiSvgModule,
    TuiLetModule,
  ],
  exports: [ReportDetailsComponent],
  providers: [ORDER_DETAILS_PROVIDER],
})
export class ReportDetailsModule {}
