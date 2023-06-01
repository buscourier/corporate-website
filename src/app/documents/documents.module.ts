import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {DocumentsRoutingModule} from './documents-routing.module'
import {DocumentsComponent} from './documents.component'
import {SiteService} from '../shared/services/site.service'
import {DocumentsResolver} from './documents.resolver'

@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
  ],
  providers: [SiteService, DocumentsResolver],
})
export class DocumentsModule {}
