import {Injectable, Provider} from '@angular/core'
import {AbstractTuiDialogService, TUI_DIALOGS} from '@taiga-ui/cdk'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {ReportDetailsComponent} from '../components/report-details/report-details.component'

@Injectable({
  providedIn: 'root',
})
export class ReportDetailsService extends AbstractTuiDialogService<
  {},
  boolean
> {
  readonly defaultOptions = {}

  readonly component = new PolymorpheusComponent(ReportDetailsComponent)
}

export const ORDER_DETAILS_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: ReportDetailsService,
  multi: true,
}
