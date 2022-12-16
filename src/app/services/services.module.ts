import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ServicesRoutingModule} from './services-routing.module'
import {ServicesComponent} from './services.component'

@NgModule({
  declarations: [ServicesComponent],
  imports: [CommonModule, ServicesRoutingModule],
})
export class ServicesModule {}
