import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalMapComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {}

  get points(): number {
    return this.context.data.points
  }

  close() {
    this.context.completeWith(1)
  }
}
