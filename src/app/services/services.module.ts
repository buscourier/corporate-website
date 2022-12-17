import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ImgModule} from '../shared/components/img/img.module'
import {ServicesRoutingModule} from './services-routing.module'
import {ServicesComponent} from './services.component'

@NgModule({
  declarations: [ServicesComponent],
  imports: [CommonModule, ServicesRoutingModule, ImgModule],
})
export class ServicesModule {}
