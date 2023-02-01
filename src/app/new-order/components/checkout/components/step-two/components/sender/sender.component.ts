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
import {TuiTextMaskOptions} from '@taiga-ui/core'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  takeUntil,
  tap,
  using,
} from 'rxjs'
import {currentUserSelector} from 'src/app/auth/store/selectors'
import {
  STRINGIFY_CONFIDANT,
  STRINGIFY_DOCTYPE,
} from '../../../../../../../shared/handlers/string-handlers'
import {Pattern} from '../../../../../../../shared/pattern/pattern'
import {ConfidantInterface} from '../../../../../../../shared/types/confidant.interface'
import {CurrentUserInterface} from '../../../../../../../shared/types/current-user.interface'
import {DocTypeInterface} from '../../../../../../../shared/types/doc-type.interface'
import {personSelector} from '../../../step-one/components/person/store/selectors'
import {changeValidityAction} from './store/actions/change-validity.action'
import {changeValuesAction} from './store/actions/change-values.action'
import {getConfidantsAction} from './store/actions/get-confidants.action'
import {
  confidantsSelector,
  isConfidantsLoadingSelector,
  isSenderPristineSelector,
  senderSelector,
} from './store/selectors'
import {SenderStateInterface} from './types/sender-state.interface'
import {dueTime} from '../../../../../../../settings'
import {PersonStateInterface} from '../../../step-one/components/person/types/person-state.interface'
import {UtilsService} from '../../../../../../../shared/services/utils.service'

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_DOCTYPE}),
    tuiItemsHandlersProvider({stringify: STRINGIFY_CONFIDANT}),
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
export class SenderComponent implements OnInit, AfterViewInit {
  documents = [
    {id: 'passport', name: 'Паспорт РФ'},
    {id: 'driver', name: 'Водительское удостоверение'},
    {id: 'other', name: 'Другое'},
  ]

  isConfidantsLoading$: Observable<boolean>
  confidants$: Observable<ConfidantInterface[]>

  isEntity = false

  fio = this.fb.control({value: '', disabled: true}, [
    Validators.required,
    Validators.pattern(Pattern.Text),
    Validators.minLength(2),
  ])

  confidant = this.fb.control({value: null, disabled: true}, [
    Validators.required,
  ])

  docType = this.fb.control({}, Validators.required)
  docNumber = this.fb.control('', Validators.required)
  phone = this.fb.control('', Validators.required)

  form = this.fb.group({
    fio: this.fio,
    confidant: this.confidant,
    docType: this.docType,
    docNumber: this.docNumber,
    phone: this.phone,
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          // debounceTime(dueTime),
          distinctUntilChanged(
            (a: SenderStateInterface, b: SenderStateInterface) => {
              return this.utils.isObjectsEqual(a, b)
            }
          ),
          tap((values: SenderStateInterface) => {
            this.store.dispatch(changeValuesAction(values))
          }),
          //TODO: consider switch map, concat map or smth else?
          tap(() => {
            this.store.dispatch(
              changeValidityAction({isValid: this.form.valid})
            )
          })
        )
        .subscribe(),
    () => this.store.select(senderSelector)
  )

  _docMask: TuiTextMaskOptions = null

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private utils: UtilsService,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.isConfidantsLoading$ = this.store.select(isConfidantsLoadingSelector)
    this.confidants$ = this.store.select(confidantsSelector).pipe(
      filter(Boolean),
      tap((confidants: ConfidantInterface[]) => {
        this.confidant.patchValue(confidants[0])
      })
    )

    this.store
      .select(currentUserSelector)
      .pipe(
        tap((user: CurrentUserInterface) => {
          if (user && user.user_type === 'ur') {
            this.confidant.enable()
            this.docType.disable()
            this.docNumber.disable()

            this.isEntity = true
            this.store.dispatch(getConfidantsAction({userId: user.id}))
          } else {
            this.fio.enable()
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.store
      .select(isSenderPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.confidant.valueChanges
      .pipe(
        tap((value: ConfidantInterface | string) => {
          if (value instanceof Object) {
            this.phone.setValue(value.phone)
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.docType.valueChanges
      .pipe(
        tap((doc: DocTypeInterface) => {
          this.docNumber.setValue('')
          this.docNumber.markAsUntouched()
          this.docMask = doc.id
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  ngAfterViewInit() {
    this.docType.setValue(this.documents[0])

    //Todo: move it from afterViewInit?
    combineLatest([
      this.store.select(personSelector),
      this.store.select(currentUserSelector),
    ])
      .pipe(
        tap(([person, currentUser]) => {
          if (
            person.role === 'Отправитель' &&
            currentUser &&
            currentUser.user_type !== 'ur'
          ) {
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

  get docMask(): TuiTextMaskOptions | any {
    //TODO: Need to remove any
    return this._docMask
  }

  set docMask(id: string) {
    let mask = []

    switch (id) {
      case 'passport':
        mask = [/\d/, /\d/, /\d/, /\d/, ` `, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        break
      case 'driver':
        mask = [
          /\d/,
          /\d/,
          /\d/,
          `-`,
          /\d/,
          /\d/,
          /\d/,
          `-`,
          /\d/,
          /\d/,
          /\d/,
          `-`,
          /\d/,
          /\d/,
        ]
        break
      default:
        mask = [Pattern.Numbers]
    }

    this._docMask = {
      guide: false,
      mask,
    }
  }
}
