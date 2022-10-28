import {ScrollingModule} from '@angular/cdk/scrolling'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiLoaderModule, TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core'
import {TuiPaginationModule} from '@taiga-ui/kit'
import {MobileDataModule} from '../../../shared/components/mobile-data/mobile-data.module'
import {LetModule} from '../../../shared/directives/let/let.module'
import {FilterModule} from './components/filter/filter.module'
import {ReportDetailsModule} from './components/report-details/report-details.module'
import {ReportComponent} from './components/report/report.component'
import {ReportRoutingModule} from './report-routing.module'
import {ReportService} from './services/report.service'
import {GetOrdersEffect} from './store/effects/get-orders.effect'
import {reducer} from './store/reducer'
import {REPORT_FEATURE} from './store/state'

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
