import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {PolicyRoutingModule} from './policy-routing.module'
import {PolicyComponent} from './policy.component'

@NgModule({
  declarations: [PolicyComponent],
  imports: [CommonModule, PolicyRoutingModule],
})
export class PolicyModule {}
