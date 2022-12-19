import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {TuiLineClampModule} from '@taiga-ui/kit'
import {CitiesModule} from '../shared/components/cities/cities.module'
import {ImgModule} from '../shared/components/img/img.module'
import {CalculatorModule} from './components/calculator/calculator.module'
import {ExamplesModule} from './components/examples/examples.module'
import {TaskFormModule} from './components/task-form/task-form.module'
import {IndexRoutingModule} from './index-routing.module'
import {IndexComponent} from './index.component'

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    TuiSvgModule,
    CalculatorModule,
    CitiesModule,
    TaskFormModule,
    ImgModule,
    ExamplesModule,
    TuiLineClampModule,
  ],
})
export class IndexModule {}
