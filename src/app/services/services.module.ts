import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ImgModule} from '../shared/components/img/img.module'
import {ServicesRoutingModule} from './services-routing.module'
import {ServicesComponent} from './services.component'
import {IndexModule} from './index/index.module'
import {ComplexTasksModule} from './complex-tasks/complex-tasks.module'
import {InsuranceModule} from './insurance/insurance.module'
import {CseModule} from './cse/cse.module'
import {CourierModule} from './courier/courier.module'

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ImgModule,
    IndexModule,
    CourierModule,
    ComplexTasksModule,
    InsuranceModule,
    CseModule,
  ],
})
export class ServicesModule {}
