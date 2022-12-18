import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-how-to-get',
  templateUrl: './how-to-get.component.html',
  styleUrls: ['./how-to-get.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToGetComponent {
  constructor() {}
}
