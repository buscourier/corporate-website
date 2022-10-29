import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-new-order-quick',
  templateUrl: './new-order-quick.component.html',
  styleUrls: ['./new-order-quick.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderQuickComponent {}
