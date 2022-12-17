import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerComponent {
  constructor() {}
}
