import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourierComponent {
  constructor() {}
}
