import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterLink} from '@angular/router'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule, TuiLoaderModule} from '@taiga-ui/core'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {TotalSumService} from './services/total-sum.service'

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiButtonModule,
    RouterLink,
    TuiLetModule,
  ],
  exports: [SidebarComponent],
  providers: [TotalSumService],
})
export class SidebarModule {}
