import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterLink} from '@angular/router'
import {TuiButtonModule} from '@taiga-ui/core'
import {EndPointModule} from 'src/app/new-order/shared/components/end-point/end-point.module'
import {StepThreeComponent} from './components/step-three/step-three.component'

@NgModule({
  declarations: [StepThreeComponent],
  imports: [CommonModule, EndPointModule, RouterLink, TuiButtonModule],
})
export class StepThreeModule {}