import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {SupportFormModule} from '../../shared/components/support-form/support-form.module'
import {CalculatorComponent} from './components/calculator/calculator.component'
import {MapComponent} from './components/map/map.component'
import {CseRoutingModule} from './cse-routing.module'
import {CseComponent} from './cse.component'

@NgModule({
  declarations: [CseComponent, MapComponent, CalculatorComponent],
  imports: [
    CommonModule,
    CseRoutingModule,
    TuiSvgModule,
    SupportFormModule,
    TuiButtonModule,
    TuiLoaderModule,
  ],
})
export class CseModule {}
