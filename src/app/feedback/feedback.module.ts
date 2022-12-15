import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FeedbackRoutingModule} from './feedback-routing.module'
import {FeedbackComponent} from './feedback.component'

@NgModule({
  declarations: [FeedbackComponent],
  imports: [CommonModule, FeedbackRoutingModule],
})
export class FeedbackModule {}
