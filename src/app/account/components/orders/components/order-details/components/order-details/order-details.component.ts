import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {TuiDialog} from '@taiga-ui/cdk'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{}, boolean>
  ) {}
}
