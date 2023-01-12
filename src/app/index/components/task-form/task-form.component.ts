import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {Pattern} from '../../../shared/pattern/pattern'
import {sendMessageAction} from './store/actions/send-message.action'
import {
  isSubmittingSelector,
  responseSelector,
  validationErrorsSelector,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  isSubmitting$: Observable<boolean>
  validationErrors$: Observable<string>

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

    //@ts-ignore
    const tracker = window.b24Tracker.guest.getTrace()
    console.log('tracker', tracker)
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    this.store.dispatch(sendMessageAction({payload}))
  }
}
