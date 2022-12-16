import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {PackagingRoutingModule} from './packaging-routing.module'
import {PackagingComponent} from './packaging.component'

@NgModule({
  declarations: [PackagingComponent],
  imports: [CommonModule, PackagingRoutingModule],
})
export class PackagingModule {}
