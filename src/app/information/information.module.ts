import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {InformationRoutingModule} from './information-routing.module'
import {InformationComponent} from './information.component'

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, InformationRoutingModule, TuiSvgModule],
})
export class InformationModule {}
