import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {reducer} from './store/reducer'
import {GetOrderEffect} from './store/effects/get-order.effect'
import {CancelOrderEffect} from './store/effects/cancel-order.effect'
import {ORDER_DETAILS_PROVIDER} from './services/report-details.service'
import {ReportDetailsComponent} from './components/report-details/report-details.component'
import {REPORT_DETAILS_FEATURE} from './store/state'

@NgModule({
  declarations: [ReportDetailsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(REPORT_DETAILS_FEATURE, reducer),
    EffectsModule.forFeature([GetOrderEffect, CancelOrderEffect]),
  ],
  exports: [ReportDetailsComponent],
  providers: [ORDER_DETAILS_PROVIDER],
})
export class ReportDetailsModule {}
