import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {ImgModule} from '../../shared/components/img/img.module'
import {TableModule} from '../../shared/components/table/table.module'
import {InsuranceRoutingModule} from './insurance-routing.module'
import {InsuranceComponent} from './insurance.component'

@NgModule({
  declarations: [InsuranceComponent],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    ImgModule,
    TableModule,
    TuiSvgModule,
  ],
})
export class InsuranceModule {}
