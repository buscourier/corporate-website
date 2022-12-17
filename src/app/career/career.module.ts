import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ImgModule} from '../shared/components/img/img.module'
import {CareerRoutingModule} from './career-routing.module'
import {CareerComponent} from './career.component'

@NgModule({
  declarations: [CareerComponent],
  imports: [CommonModule, CareerRoutingModule, ImgModule],
})
export class CareerModule {}
