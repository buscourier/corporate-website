import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IndexComponent} from './index.component'
import {RouterModule} from '@angular/router'
import {TuiSvgModule} from '@taiga-ui/core'
import {DocumentsResolver} from '../../shared/resolvers/documents.resolver'

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, RouterModule, TuiSvgModule],
  providers: [DocumentsResolver],
})
export class IndexModule {}
