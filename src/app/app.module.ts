import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {EffectsModule} from '@ngrx/effects'
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {
  TUI_SANITIZER,
  TUI_SVG_SRC_PROCESSOR,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core'
import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n'
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify'
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha'
import {of} from 'rxjs'
import {environment} from '../environments/environment'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthModule} from './auth/auth.module'
import {PageFooterModule} from './shared/components/page-footer/page-footer.module'
import {PageHeaderModule} from './shared/components/page-header/page-header.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageHeaderModule,
    PageFooterModule,
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
    RecaptchaV3Module,
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
    // {
    //   provide: TUI_DATE_VALUE_TRANSFORMER,
    //   useClass: DateTransformer,
    // },
    // {
    //   provide: TUI_DATE_RANGE_VALUE_TRANSFORMER,
    //   deps: [TUI_DATE_VALUE_TRANSFORMER],
    //   useFactory: getDateRangeTransformer,
    // },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LcTi20dAAAAAL2vjBwFpAGHt2PU5qY7HM003S_E',
    },
    {
      provide: TUI_SVG_SRC_PROCESSOR,
      useFactory: () => {
        return (src: string): string => {
          const myCustomPrefix = `icons::`

          return src.startsWith(myCustomPrefix)
            ? `assets/icons/${src.replace(myCustomPrefix, ``)}.svg`
            : src
        }
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
