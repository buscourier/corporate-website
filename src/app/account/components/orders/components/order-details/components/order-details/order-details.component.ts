import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDialog} from '@taiga-ui/cdk'

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
