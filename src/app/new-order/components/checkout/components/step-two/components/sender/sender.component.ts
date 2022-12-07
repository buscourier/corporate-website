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
import {isSenderPristineSelector, senderSelector} from './store/selectors'
import {SenderStateInterface} from './types/sender-state.interface'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {Pattern} from '../../../../../../../shared/pattern/pattern'
import {STRINGIFY_DOCTYPE} from '../../../../../../../shared/handlers/string-handlers'
import {DocTypeInterface} from '../../../../../../../shared/types/doc-type.interface'
import {TuiTextMaskOptions} from '@taiga-ui/core'

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_DOCTYPE}),
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
export class SenderComponent implements OnInit, AfterViewInit, OnDestroy {
  documents = [
    {id: 'passport', name: 'Паспорт РФ'},
    {id: 'driver', name: 'Водительское удостоверение'},
    {id: 'other', name: 'Другое'},
  ]
  personSub: Subscription
  docTypeSub: Subscription
  isSenderPristineSub: Subscription

  form = this.fb.group({
    fio: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    docType: [{}, Validators.required],
    docNumber: ['', Validators.required],
    phone: ['', Validators.required],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.isSenderPristineSub = this.store
      .select(isSenderPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
          }
        })
      )
      .subscribe()

    this.docTypeSub = this.form
      .get('docType')
      .valueChanges.pipe(
        tap((doc: DocTypeInterface) => {
          this.form.get('docNumber').setValue('')
          this.form.get('docNumber').markAsUntouched()
          this.docMask = doc.id
        })
      )
      .subscribe()
  }

  ngAfterViewInit() {
    this.form.get('docType').setValue(this.documents[0])

    this.personSub = this.store
      .select(personSelector)
      .pipe(
        tap((person: PersonStateInterface) => {
          if (person.role === 'Отправитель') {
            this.form.patchValue({
              fio: `${person.lastName} ${person.firstName} ${person.middleName}`,
              phone: person.phone,
            })
          }
        })
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

  ngOnDestroy(): void {
    this.isSenderPristineSub.unsubscribe()
    this.docTypeSub.unsubscribe()
  }
}
