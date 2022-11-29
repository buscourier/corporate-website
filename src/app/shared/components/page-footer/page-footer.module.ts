import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {TuiSvgModule} from '@taiga-ui/core'
import {PageFooterComponent} from './page-footer.component'

@NgModule({
  declarations: [PageFooterComponent],
  imports: [CommonModule, RouterModule, TuiSvgModule],
  exports: [PageFooterComponent],
})
export class PageFooterModule {}
