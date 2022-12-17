import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {ImgModule} from '../shared/components/img/img.module'
import {AboutRoutingModule} from './about-routing.module'
import {AboutComponent} from './about.component'

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, TuiSvgModule, ImgModule],
})
export class AboutModule {}
