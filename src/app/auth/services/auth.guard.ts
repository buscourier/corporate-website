import {Inject, Injectable, Injector} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {Observable, take} from 'rxjs'
import {tap} from 'rxjs/operators'
import {isLoggedInSelector} from '../../auth/store/selectors'
import {LoginComponent} from '../components/login/login.component'
import {LoginService} from '../components/login/services/login.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  isLoggedIn$: Observable<boolean>

  constructor(
    private store: Store,
    private router: Router,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(LoginService) private readonly loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)

    return this.isLoggedIn$.pipe(
      // filter(Boolean),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(LoginComponent, this.injector),
              {
                dismissible: true,
                closeable: false,
                size: 'auto',
              }
            )
            .pipe(take(1))
            .subscribe()
        }
      })
    )
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state)
  }

  showLoginModal() {}
}
