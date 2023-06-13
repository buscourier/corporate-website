import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewsItemComponent} from './news-item.component'
import {TuiSvgModule} from '@taiga-ui/core'
import {ImgModule} from '../../../shared/components/img/img.module'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [NewsItemComponent],
  imports: [CommonModule, TuiSvgModule, ImgModule, TuiLetModule],
})
export class NewsItemModule {}
