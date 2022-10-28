import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {TuiSidebarModule} from '@taiga-ui/addon-mobile'
import {TuiActiveZoneModule, TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule, TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core'
import {TuiAccordionModule} from '@taiga-ui/kit'
import {BreadcrumbsModule} from './components/breadcrumbs/breadcrumbs.module'
import {PageHeaderComponent} from './page-header.component'

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
    BreadcrumbsModule,
  ],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
