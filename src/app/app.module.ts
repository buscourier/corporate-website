import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify'
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core'
import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {environment} from '../environments/environment'
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {AuthModule} from './auth/auth.module'
import {PageHeaderModule} from './shared/components/page-header/page-header.module'
import {of} from 'rxjs'
import {
  TUI_DATE_RANGE_VALUE_TRANSFORMER,
  TUI_DATE_VALUE_TRANSFORMER,
} from '@taiga-ui/kit'
import {DateTransformer} from './shared/services/date-transformer.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageHeaderModule,
    AuthModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production,
        }),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: BaseUrlInterceptor,
    //   multi: true,
    // },
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    {
      provide: TUI_DATE_VALUE_TRANSFORMER,
      useClass: DateTransformer,
    },
    // {
    //   provide: TUI_DATE_RANGE_VALUE_TRANSFORMER,
    //   deps: [TUI_DATE_VALUE_TRANSFORMER],
    //   useFactory: getDateRangeTransformer,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
