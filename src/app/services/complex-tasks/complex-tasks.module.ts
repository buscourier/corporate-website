import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {ImgModule} from '../../shared/components/img/img.module'
import {SupportFormModule} from '../../shared/components/support-form/support-form.module'
import {ComplexTasksRoutingModule} from './complex-tasks-routing.module'
import {ComplexTasksComponent} from './complex-tasks.component'

@NgModule({
  declarations: [ComplexTasksComponent],
  imports: [
    CommonModule,
    ComplexTasksRoutingModule,
    ImgModule,
    SupportFormModule,
    TuiSvgModule,
  ],
})
export class ComplexTasksModule {}
