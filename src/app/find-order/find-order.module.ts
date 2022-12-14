import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FindOrderRoutingModule} from './find-order-routing.module'
import {FindOrderComponent} from './find-order.component'

@NgModule({
  declarations: [FindOrderComponent],
  imports: [CommonModule, FindOrderRoutingModule],
})
export class FindOrderModule {}
