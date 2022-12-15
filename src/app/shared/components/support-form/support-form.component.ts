import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {
  isSubmittingSelector,
  responseSelector,
  validationErrorsSelector,
} from './store/selectors'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {FormBuilder, Validators} from '@angular/forms'
import {Pattern} from '../../pattern/pattern'
import {sendMessageAction} from './store/actions/send-message.action'
import {ResponseInterface} from './types/response.interface'
import {tap} from 'rxjs/operators'

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
          return `Только буквы`
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportFormComponent implements OnInit {
  isSubmitting$: Observable<boolean>
  response$: Observable<ResponseInterface>
  validationErrors$: Observable<string>

  form = this.fb.group({
    sender: [
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
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.store
      .select(responseSelector)
      .pipe(
        tap(() => {
          this.form.reset()
        })
      )
      .subscribe()

    this.validationErrors$ = this.store.select(validationErrorsSelector)
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    console.log('payload', payload)
    this.store.dispatch(sendMessageAction({payload}))
  }
}
