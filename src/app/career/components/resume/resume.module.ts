import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ResumeComponent} from './resume.component'
import {TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [ResumeComponent],
  imports: [CommonModule, TuiLoaderModule, TuiSvgModule],
})
export class ResumeModule {}
