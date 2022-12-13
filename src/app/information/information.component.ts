import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  constructor() {}
}
