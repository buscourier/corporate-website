import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {}

  get heading(): number {
    return this.context.data.heading
  }

  get success(): number {
    return this.context.data.success
  }

  get failure(): number {
    return this.context.data.failure
  }

  close() {
    this.context.completeWith(1)
  }
}
