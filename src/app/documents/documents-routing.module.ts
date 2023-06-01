import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {DocumentsComponent} from './documents.component'
import {DocumentsResolver} from './documents.resolver'

const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
    resolve: {
      documents: DocumentsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
