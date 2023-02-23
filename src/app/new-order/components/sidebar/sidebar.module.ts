import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterLink} from '@angular/router'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core'
import {TotalSumService} from './services/total-sum.service'
import {SidebarComponent} from './sidebar.component'

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiButtonModule,
    RouterLink,
    TuiLetModule,
    TuiSvgModule,
    TuiScrollbarModule,
  ],
  exports: [SidebarComponent],
  providers: [TotalSumService],
})
export class SidebarModule {}
