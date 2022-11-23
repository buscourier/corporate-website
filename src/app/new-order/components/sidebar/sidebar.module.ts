import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterLink} from '@angular/router'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule, TuiLoaderModule} from '@taiga-ui/core'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {TotalSumService} from './services/total-sum.service'
import {reducer} from './store/reducer'
import {SIDEBAR_FEATURE} from './store/state'

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiButtonModule,
    RouterLink,
    TuiLetModule,
    StoreModule.forFeature(SIDEBAR_FEATURE, reducer),
  ],
  exports: [SidebarComponent],
  providers: [TotalSumService],
})
export class SidebarModule {}
