import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PageHeaderComponent} from './page-header.component'
import {TuiButtonModule, TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core'
import {RouterModule} from '@angular/router'
import {TuiActiveZoneModule, TuiLetModule} from '@taiga-ui/cdk'
import {TuiSidebarModule} from '@taiga-ui/addon-mobile'
import {TuiAccordionModule} from '@taiga-ui/kit'

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiSvgModule,
    TuiLetModule,
    TuiButtonModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiAccordionModule,
    TuiScrollbarModule,
  ],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
