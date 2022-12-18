import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {DocumentsRoutingModule} from './documents-routing.module'
import {DocumentsComponent} from './documents.component'

@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
  ],
})
export class DocumentsModule {}
