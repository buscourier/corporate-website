import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiLetModule} from '@taiga-ui/cdk'
import {DataComponent} from './components/data/data.component'
import {ReportComponent} from './report.component'

@NgModule({
  declarations: [ReportComponent, DataComponent],
  imports: [CommonModule, TuiLetModule],
  exports: [ReportComponent],
})
export class ReportModule {}
