import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IndexComponent} from './index.component'
import {ImgModule} from '../../shared/components/img/img.module'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, ImgModule, RouterModule],
})
export class IndexModule {}
