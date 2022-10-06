import {ModuleWithProviders, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RegisterComponent} from 'src/app/auth/components/register/register.component'
import {AuthRoutingModule} from './auth-routing.module'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {AuthService} from './services/auth.service'
import {EffectsModule} from '@ngrx/effects'
import {RegisterEffect} from './store/effects/register.effect'
import {LoginComponent} from './components/login/login.component'
import {LoginEffect} from './store/effects/login.effect'
import {GetCurrentUserEffect} from './store/effects/get-current-user.effect'
import {UpdateCurrentUserEffect} from './store/effects/update-current-user.effect'
import {LogoutEffect} from './store/effects/logout.effect'
import {BackendErrorMessagesModule} from '../shared/components/backend-error-messages/backend-error-messages.module'
import {AuthGuard} from './services/auth.guard'
import {HttpClientModule} from '@angular/common/http'
import {PersistenceService} from '../shared/services/persistence.service'

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
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
