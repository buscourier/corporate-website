import {CommonModule} from '@angular/common'
import {ModuleWithProviders, NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {PersistenceService} from '../shared/services/persistence.service'
import {AuthRoutingModule} from './auth-routing.module'
import {LoginModule} from './components/login/login.module'
import {RegisterModule} from './components/register/register.module'
import {AuthGuard} from './services/auth.guard'
import {AuthService} from './services/auth.service'
import {GetCurrentUserEffect} from './store/effects/get-current-user.effect'
import {LoginEffect} from './store/effects/login.effect'
import {LogoutEffect} from './store/effects/logout.effect'
import {RegisterEffect} from './store/effects/register.effect'
import {UpdateCurrentUserEffect} from './store/effects/update-current-user.effect'
import {reducers} from './store/reducers'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
    ]),
    AuthRoutingModule,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        PersistenceService,
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: AuthInterceptor,
        //   multi: true,
        // },
      ],
    }
  }
}
