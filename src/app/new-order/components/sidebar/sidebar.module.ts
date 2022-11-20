import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {TotalSumService} from './services/total-sum.service'

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule],
  exports: [SidebarComponent],
  providers: [TotalSumService],
})
export class SidebarModule {}
