import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReportRoutingModule} from './report-routing.module'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {REPORT_FEATURE} from './store/state'
import {GetOrdersEffect} from './store/effects/get-orders.effect'
import {reducer} from './store/reducer'
import {ReportService} from './services/report.service'
import {FilterModule} from './components/filter/filter.module'
import {ReportComponent} from './components/report/report.component'
import {ReportDetailsModule} from './components/report-details/report-details.module'
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table'
import {TuiLoaderModule, TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'
import {TuiPaginationModule} from '@taiga-ui/kit'
import {MobileDataModule} from '../../../shared/components/mobile-data/mobile-data.module'
import {ScrollingModule} from '@angular/cdk/scrolling'
import {TuiLetModule} from '@taiga-ui/cdk'
import {LetModule} from '../../../shared/directives/let/let.module'

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    FilterModule,
    ReportDetailsModule,
    ReportRoutingModule,
    StoreModule.forFeature(REPORT_FEATURE, reducer),
    EffectsModule.forFeature([GetOrdersEffect]),
    LetModule,
    TuiLetModule,
    TuiTableModule,
    TuiTablePaginationModule,
    TuiLoaderModule,
    TuiCurrencyPipeModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiPaginationModule,
    MobileDataModule,
    ScrollingModule,
  ],
  providers: [ReportService],
})
export class ReportModule {}
