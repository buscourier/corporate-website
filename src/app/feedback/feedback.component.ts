import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {Observable, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'

import {Pattern} from '../shared/pattern/pattern'
import {sendMessageAction} from './store/actions/send-message.action'
import {
  isSubmittingSelector,
  responseSelector,
  validationErrorsSelector,
} from './store/selectors'
import {ResponseInterface} from './types/response.interface'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  isSubmitting$: Observable<boolean>
  response$: Observable<ResponseInterface>
  validationErrors$: Observable<string>

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

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.validationErrors$ = this.store.select(validationErrorsSelector)

    this.store
      .select(responseSelector)
      .pipe(
        tap(() => {
          this.form.reset()
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    this.store.dispatch(sendMessageAction({payload}))
  }
}
