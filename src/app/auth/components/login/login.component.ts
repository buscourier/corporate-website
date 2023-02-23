import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {TuiDialogContext} from '@taiga-ui/core'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {Observable, Subscription, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {clearValidationErrorsAction} from '../../store/actions/clear-validation-errors'
import {loginAction} from '../../store/actions/login.action'
import {
  backendErrorsSelector,
  isLoadingSelector,
  isLoggedInSelector,
  isSubmittingSelector,
} from '../../store/selectors'
import {LoginRequestInterface} from '../../types/login-request.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
        email: `Укажите корректный email`,
      },
    },
    TuiDestroyService,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup
  isLoading$: Observable<boolean>
  isSubmitting$: Observable<boolean>
  isLoggedInSubscription: Subscription
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  ngOnDestroy() {
    this.clearValidationErrors()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.store
      .select(isLoggedInSelector)
      .pipe(
        tap((isLoggedIn: null | boolean) => {
          if (isLoggedIn) {
            this.context.completeWith(true)
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: [
        'tafibuchgalter@mail.ru',
        [Validators.required, Validators.email],
      ],
      password: ['tafitafi', [Validators.required]],
    })
  }

  clearValidationErrors(): void {
    this.store.dispatch(clearValidationErrorsAction())
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    }

    this.store.dispatch(loginAction({request}))
  }

  onClose() {
    this.context.completeWith(false)
  }
}
