import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AuthRoutingModule} from './auth-routing.module'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {AuthService} from './services/auth.service'
import {EffectsModule} from '@ngrx/effects'
import {RegisterEffect} from './store/effects/register.effect'
import {LoginEffect} from './store/effects/login.effect'
import {GetCurrentUserEffect} from './store/effects/get-current-user.effect'
import {UpdateCurrentUserEffect} from './store/effects/update-current-user.effect'
import {LogoutEffect} from './store/effects/logout.effect'
import {AuthGuard} from './services/auth.guard'
import {PersistenceService} from '../shared/services/persistence.service'
import {LoginModule} from './components/login/login.module'
import {RegisterModule} from './components/register/register.module'

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
      providers: [AuthService, AuthGuard, PersistenceService],
    }
  }
}
