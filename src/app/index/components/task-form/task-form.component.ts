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
import {Pattern} from '../../../shared/pattern/pattern'
import {SiteService} from '../../../shared/services/site.service'
import {sendMessageAction} from './store/actions/send-message.action'
import {sendWebhookAction} from './store/actions/send-webhook.action'
import {
  backendErrorsSelector,
  isSubmittingSelector,
  responseSelector,
} from './store/selectors'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
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
          return `Только буквы`
        },
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  isSubmitting$: Observable<boolean>
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
    email: ['', [Validators.required, Validators.email]],
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
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService,
    private siteService: SiteService
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
          // this.form.reset()
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    //@ts-ignore
    this.form.get('trace').setValue(window.b24Tracker.guest.getTrace())
    console.log('tracker', this.form.get('trace').value)
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    console.log('this.form.value', this.form.value)
    this.store.dispatch(sendMessageAction({payload}))
  }
}
