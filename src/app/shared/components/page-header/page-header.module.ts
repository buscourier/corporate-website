import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PageHeaderComponent} from './page-header.component'
import {TuiSvgModule} from '@taiga-ui/core'
import {RouterModule} from '@angular/router'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [CommonModule, TuiSvgModule, RouterModule, TuiLetModule],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
