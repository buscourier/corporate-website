import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable, Subscription} from 'rxjs'
import {Store} from '@ngrx/store'
import {
  isLoadingSelector,
  isLoggedInSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {LoginRequestInterface} from '../../types/login-request.interface'
import {loginAction} from '../../store/actions/login.action'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {TuiDialog} from '@taiga-ui/cdk'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {tap} from 'rxjs/operators'
import {clearValidationErrorsAction} from '../../store/actions/clear-validation-errors'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'

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
    readonly context: TuiDialog<{}, boolean>
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(validationErrorsSelector)

    this.isLoggedInSubscription = this.store
      .select(isLoggedInSelector)
      .pipe(
        tap((isLoggedIn: null | boolean) => {
          if (isLoggedIn) {
            this.context.completeWith(true)
          }
        })
      )
      .subscribe()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
