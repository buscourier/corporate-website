import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {ImgModule} from '../../shared/components/img/img.module'
import {TableModule} from '../../shared/components/table/table.module'
import {PackageComponent} from './components/package/package.component'
import {PackagingRoutingModule} from './packaging-routing.module'
import {PackagingComponent} from './packaging.component'

@NgModule({
  declarations: [PackagingComponent, PackageComponent],
  imports: [
    CommonModule,
    PackagingRoutingModule,
    ImgModule,
    TableModule,
    TuiSvgModule,
    TuiButtonModule,
  ],
})
export class PackagingModule {}
