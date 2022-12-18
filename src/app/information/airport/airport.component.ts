import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirportComponent {
  constructor() {}
}
