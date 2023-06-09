import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {ImgModule} from '../shared/components/img/img.module'
import {CareerRoutingModule} from './career-routing.module'
import {CareerComponent} from './career.component'
import {AchievementsModule} from './components/achievements/achievements.module'
import {ResumeModule} from './components/resume/resume.module'

@NgModule({
  declarations: [CareerComponent],
  imports: [
    CommonModule,
    CareerRoutingModule,
    ImgModule,
    TuiSvgModule,
    AchievementsModule,
    ResumeModule,
  ],
})
export class CareerModule {}
