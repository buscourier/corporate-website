import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {ImageModule} from '../shared/components/image/image.module'
import {CitiesFormModule} from './components/cities-form/cities-form.module'
import {IndexRoutingModule} from './index-routing.module'
import {IndexComponent} from './index.component'

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    TuiSvgModule,
    CitiesFormModule,
    ImageModule,
  ],
})
export class IndexModule {}
