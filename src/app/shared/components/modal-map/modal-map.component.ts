import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {OfficeInterface} from '../../types/office.interface'

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

  get points(): OfficeInterface[] {
    return this.context.data.points
  }

  get disableScrollZoom(): boolean {
    return this.context.data.disableScrollZoom
  }

  get showHint(): boolean {
    return !!this.context.data.showHint
  }

  get showBalloon(): boolean {
    return !!this.context.data.showBalloon
  }

  close() {
    this.context.completeWith(1)
  }
}
