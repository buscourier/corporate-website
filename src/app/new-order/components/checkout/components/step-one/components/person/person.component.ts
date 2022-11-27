import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Subscription, using} from 'rxjs'
import {tap} from 'rxjs/operators'
import {changeValidityAction} from './store/actions/change-validity.action'
import {changeValuesAction} from './store/actions/change-values.action'
import {isPersonPristineSelector, personSelector} from './store/selectors'
import {PersonStateInterface} from './types/person-state.interface'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit, AfterViewInit, OnDestroy {
  roles = ['Отправитель', 'Получатель']

  form = this.fb.group({
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    role: ['', Validators.required],
  })

  isPersonPristineSub: Subscription

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.isPersonPristineSub = this.store
      .select(isPersonPristineSelector)
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
    this.form.get('role').setValue(this.roles[0])
  }

  ngOnDestroy(): void {
    this.isPersonPristineSub.unsubscribe()
  }
}
