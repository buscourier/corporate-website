import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindOrderComponent {
  constructor() {}
}
