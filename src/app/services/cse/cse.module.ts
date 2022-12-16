import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {CseRoutingModule} from './cse-routing.module'
import {CseComponent} from './cse.component'

@NgModule({
  declarations: [CseComponent],
  imports: [CommonModule, CseRoutingModule],
})
export class CseModule {}
