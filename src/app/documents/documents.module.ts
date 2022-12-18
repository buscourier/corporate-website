import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {DocumentsRoutingModule} from './documents-routing.module'
import {DocumentsComponent} from './documents.component'

@NgModule({
  declarations: [DocumentsComponent],
  imports: [CommonModule, DocumentsRoutingModule],
})
export class DocumentsModule {}
