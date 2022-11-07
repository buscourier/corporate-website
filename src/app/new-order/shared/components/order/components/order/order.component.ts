import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {OrderStateInterface} from '../../types/order-state.interface'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  form = this.fb.group<OrderStateInterface>({
    cargo: '',
    packages: [],
    services: [],
  })

  constructor(private fb: FormBuilder) {}
}
