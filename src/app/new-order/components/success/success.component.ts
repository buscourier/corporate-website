import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent {
  constructor() {}
}
