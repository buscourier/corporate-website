import {Injectable, Provider} from '@angular/core'
import {AbstractTuiDialogService, TUI_DIALOGS} from '@taiga-ui/cdk'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {LoginComponent} from '../login.component'

@Injectable({
  providedIn: 'root',
})
export class LoginService extends AbstractTuiDialogService<{}, boolean> {
  readonly defaultOptions = {}

  readonly component = new PolymorpheusComponent(LoginComponent)
}

export const LOGIN_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: LoginService,
  multi: true,
}
