import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ImgModule} from '../../shared/components/img/img.module'
import {PackageComponent} from './components/package/package.component'
import {PackagingRoutingModule} from './packaging-routing.module'
import {PackagingComponent} from './packaging.component'

@NgModule({
  declarations: [PackagingComponent, PackageComponent],
  imports: [CommonModule, PackagingRoutingModule, ImgModule],
})
export class PackagingModule {}
