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
import {debounceTime, distinctUntilChanged, takeUntil, using} from 'rxjs'
import {tap} from 'rxjs/operators'
import {Pattern} from '../../../../../../../shared/pattern/pattern'
import {changeValidityAction} from './store/actions/change-validity.action'
import {changeValuesAction} from './store/actions/change-values.action'
import {isPersonPristineSelector, personSelector} from './store/selectors'
import {PersonStateInterface} from './types/person-state.interface'
import {UtilsService} from '../../../../../../../shared/services/utils.service'
import {dueTime} from '../../../../../../../settings'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
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
export class PersonComponent implements OnInit, AfterViewInit {
  //TODO: rename PersonComponent -> AuthorComponent

  roles = ['Отправитель', 'Получатель']

  form = this.fb.group({
    lastName: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    firstName: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    middleName: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(Pattern.email),
      ],
    ],
    phone: ['', Validators.required],
    role: ['', Validators.required],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          debounceTime(dueTime),
          distinctUntilChanged(
            (a: PersonStateInterface, b: PersonStateInterface) => {
              return this.utils.isObjectsEqual(a, b)
            }
          ),
          tap((values: PersonStateInterface) => {
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
    () => this.store.select(personSelector)
  )

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.store
      .select(isPersonPristineSelector)
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
    this.form.get('role').setValue(this.roles[0])
  }
}
