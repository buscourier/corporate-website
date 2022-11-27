import {
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
import {initialState} from './store/state'
import {PersonStateInterface} from './types/person-state.interface'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit, OnDestroy {
  roles = ['Отправитель', 'Получатель']

  form = this.fb.group({
    lastName: [initialState.lastName, Validators.required],
    firstName: [initialState.firstName, Validators.required],
    middleName: [initialState.middleName, Validators.required],
    email: [initialState.email, Validators.required],
    phone: [initialState.phone, Validators.required],
    role: [initialState.role, Validators.required],
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

  ngOnDestroy(): void {
    this.isPersonPristineSub.unsubscribe()
  }
}
