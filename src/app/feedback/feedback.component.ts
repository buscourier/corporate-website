import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  constructor() {}
}
