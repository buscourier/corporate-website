import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {filter, Observable, of, switchMap, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {Pattern} from '../shared/pattern/pattern'
import {sendMessageAction} from './store/actions/send-message.action'
import {sendWebhookAction} from './store/actions/send-webhook.action'
import {
  backendErrorsSelector,
  isPristineSelector,
  isSubmittingSelector,
  responseSelector,
} from './store/selectors'
import {ResponseInterface} from './types/response.interface'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {phoneLengthValidator} from '../shared/validators/phone-length.validator'
import {WindowInterface} from '../shared/types/window.interface'
import {Router} from '@angular/router'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [
    TuiDestroyService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Заполните`,
        email: `Некорректный email`,
        minlength: (error) => {
          return `Минимум ${error.requiredLength} символа`
        },
        pattern: (error) => {
          return `Некорректные данные`
        },
        phoneLength: (error) => {
          return `Нeкорректный номер`
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  isSubmitting$: Observable<boolean>
  response$: Observable<ResponseInterface>
  backendErrors$: Observable<string>

  types = [
    {id: 1, name: 'Вопрос'},
    {id: 2, name: 'Отзыв'},
    {id: 3, name: 'Предложение или замечание'},
    {id: 4, name: 'Вопросы сотрудничества'},
  ]

  type = this.fb.control('')

  form = this.fb.group({
    sender: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    phone: ['', [Validators.required, phoneLengthValidator]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(Pattern.email),
      ],
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.TextWithNumbersAndSymbols),
        Validators.minLength(2),
      ],
    ],
    agree: [false, [Validators.required]],
    trace: [''],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.store
      .select(responseSelector)
      .pipe(
        filter(Boolean),
        switchMap(() => {
          this.store.dispatch(sendWebhookAction({payload: this.form.value}))
          return of(null)
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.store
      .select(isPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    const _window: WindowInterface = window

    if (_window.b24Tracker) {
      this.form.get('trace').setValue(_window.b24Tracker.guest.getTrace())
    }
  }

  redirectToPolicy(event: Event) {
    event.stopPropagation()
    const url = this.router.createUrlTree(['/policy'])
    window.open(url.toString(), '_blank')
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    this.store.dispatch(sendMessageAction({payload}))
  }
}
