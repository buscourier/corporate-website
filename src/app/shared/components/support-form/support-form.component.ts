import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {filter, Observable, of, switchMap, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {Pattern} from '../../pattern/pattern'
import {sendMessageAction} from './store/actions/send-message.action'
import {sendWebhookAction} from './store/actions/send-webhook.action'
import {
  backendErrorsSelector,
  isPristineSelector,
  isSubmittingSelector,
  responseSelector,
} from './store/selectors'
import {ResponseInterface} from './types/response.interface'

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.css'],
  providers: [
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
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportFormComponent implements OnInit {
  isSubmitting$: Observable<boolean>
  response$: Observable<ResponseInterface>
  backendErrors$: Observable<string>

  form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    phone: ['', [Validators.required]],
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

    //@ts-ignore
    this.form.get('trace').setValue(window.b24Tracker.guest.getTrace())
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    this.store.dispatch(sendMessageAction({payload}))
  }
}
