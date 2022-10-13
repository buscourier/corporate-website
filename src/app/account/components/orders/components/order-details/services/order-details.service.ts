import {Injectable, Provider} from '@angular/core'
import {AbstractTuiDialogService, TUI_DIALOGS} from '@taiga-ui/cdk'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {OrderDetailsComponent} from '../components/order-details/order-details.component'

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService extends AbstractTuiDialogService<{}, boolean> {
  readonly defaultOptions = {}

  readonly component = new PolymorpheusComponent(OrderDetailsComponent)
}

export const ORDER_DETAILS_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: OrderDetailsService,
  multi: true,
}
