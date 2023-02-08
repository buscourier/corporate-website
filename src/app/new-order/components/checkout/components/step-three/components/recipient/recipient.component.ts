import {
  AfterViewInit,
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
import {debounceTime, distinctUntilChanged, takeUntil, tap, using} from 'rxjs'
import {Pattern} from '../../../../../../../shared/pattern/pattern'
import {personSelector} from '../../../step-one/components/person/store/selectors'
import {PersonStateInterface} from '../../../step-one/components/person/types/person-state.interface'
import {changeValidityAction} from './store/actions/change-validity.action'
import {changeValuesAction} from './store/actions/change-values.action'
import {isRecipientPristineSelector, recipientSelector} from './store/selectors'
import {RecipientStateInterface} from './types/recipient-state.interface'
import {SenderStateInterface} from '../../../step-two/components/sender/types/sender-state.interface'
import {dueTime} from '../../../../../../../settings'
import {UtilsService} from '../../../../../../../shared/services/utils.service'
import {phoneLengthValidator} from '../../../../../../../shared/validators/phone-length.validator'

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
        phoneLength: (error) => {
          return `Нeкорректный номер`
        },
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipientComponent implements OnInit, AfterViewInit {
  form = this.fb.group({
    fio: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    phone: ['', [Validators.required, phoneLengthValidator]],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          debounceTime(dueTime),
          distinctUntilChanged(
            (a: RecipientStateInterface, b: RecipientStateInterface) => {
              return this.utils.isObjectsEqual(a, b)
            }
          ),
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

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.store
      .select(isRecipientPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  ngAfterViewInit() {
    this.store
      .select(personSelector)
      .pipe(
        tap((person: PersonStateInterface) => {
          if (person.role === 'Получатель') {
            this.form.patchValue({
              fio: `${person.lastName} ${person.firstName} ${person.middleName}`,
              phone: person.phone,
            })
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }
}
