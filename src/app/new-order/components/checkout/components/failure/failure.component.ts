import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FailureComponent {
  constructor() {}
}
