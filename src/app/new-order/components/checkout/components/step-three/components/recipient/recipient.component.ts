import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Subscription, tap, using} from 'rxjs'
import {personSelector} from '../../../step-one/components/person/store/selectors'
import {PersonStateInterface} from '../../../step-one/components/person/types/person-state.interface'
import {changeValidityAction} from './store/actions/change-validity.action'
import {changeValuesAction} from './store/actions/change-values.action'
import {isRecipientPristineSelector, recipientSelector} from './store/selectors'
import {RecipientStateInterface} from './types/recipient-state.interface'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {STRINGIFY_DOCTYPE} from '../../../../../../../shared/handlers/string-handlers'
import {Pattern} from '../../../../../../../shared/pattern/pattern'

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Заполните`,
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
export class RecipientComponent implements OnInit, AfterViewInit, OnDestroy {
  personSub: Subscription
  isRecipientPristineSub: Subscription

  form = this.fb.group({
    fio: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    phone: ['', Validators.required],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          tap((values: RecipientStateInterface) => {
            this.store.dispatch(changeValuesAction(values))
          }),
          tap(() => {
            //TODO: consider switch map, concat map or smth else?
            this.store.dispatch(
              changeValidityAction({isValid: this.form.valid})
            )
          })
        )
        .subscribe(),
    () => this.store.select(recipientSelector)
  )

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.isRecipientPristineSub = this.store
      .select(isRecipientPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
          }
        })
      )
      .subscribe()
  }

  ngAfterViewInit() {
    this.personSub = this.store
      .select(personSelector)
      .pipe(
        tap((person: PersonStateInterface) => {
          if (person.role === 'Получатель') {
            this.form.patchValue({
              fio: `${person.lastName} ${person.firstName} ${person.middleName}`,
              phone: person.phone,
            })
          }
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.isRecipientPristineSub.unsubscribe()
    this.personSub.unsubscribe()
  }
}
