import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {Pattern} from '../../pattern/pattern'
import {sendMessageAction} from './store/actions/send-message.action'
import {
  isSubmittingSelector,
  responseSelector,
  validationErrorsSelector,
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
    this.store.dispatch(sendMessageAction({payload}))
  }
}