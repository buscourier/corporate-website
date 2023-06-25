import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDialogContext} from '@taiga-ui/core'
import {Store} from '@ngrx/store'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {filter, Observable, of, switchMap, take, takeUntil} from 'rxjs'
import {FormBuilder, Validators} from '@angular/forms'
import {Pattern} from '../../../shared/pattern/pattern'
import {phoneLengthValidator} from '../../../shared/validators/phone-length.validator'
import {tap} from 'rxjs/operators'
import {
  backendErrorsSelector,
  isPristineSelector,
  isSubmittingSelector,
  responseSelector,
} from './store/selectors'
import {sendWebhookAction} from './store/actions/send-webhook.action'
import {sendMessageAction} from './store/actions/send-message.action'
import {WindowInterface} from '../../../shared/types/window.interface'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
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
        phoneLength: (error) => {
          return `Нeкорректный номер`
        },
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnInit {
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<string>

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
    trace: [''],
  })

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
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
            // this.close()
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

  close() {
    this.context.completeWith(1)
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    this.store.dispatch(sendMessageAction({payload}))
  }
}
