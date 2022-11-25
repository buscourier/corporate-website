import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {DataComponent} from './components/data/data.component'
import {ReportComponent} from './report.component'

@NgModule({
  declarations: [ReportComponent, DataComponent],
  imports: [CommonModule],
  exports: [ReportComponent],
})
export class ReportModule {}
