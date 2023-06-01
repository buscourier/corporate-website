import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {ImgModule} from '../../shared/components/img/img.module'
import {TableModule} from '../../shared/components/table/table.module'
import {PackageComponent} from './components/package/package.component'
import {PackagingComponent} from './packaging.component'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [PackagingComponent, PackageComponent],
  imports: [
    CommonModule,
    ImgModule,
    TableModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiLetModule,
  ],
})
export class PackagingModule {}
