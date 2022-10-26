import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDialog} from '@taiga-ui/cdk'

@Component({
  selector: 'app-order-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailsComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{}, boolean>
  ) {}
}
