import {Injectable, Provider} from "@angular/core";
import {AbstractTuiDialogService, TUI_DIALOGS} from "@taiga-ui/cdk";
import { LoginOptionsInterface } from "../types/login-options.interface";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {LoginComponent} from "../login.component";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AbstractTuiDialogService<LoginOptionsInterface, boolean> {
  readonly defaultOptions = {
    heading: `Are you sure?`,
    buttons: [`Yes`, `No`],
  } as const;

  readonly component = new PolymorpheusComponent(LoginComponent);
}

export const LOGIN_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: LoginService,
  multi: true,
};
