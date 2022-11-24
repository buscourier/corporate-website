import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {using} from 'rxjs'
import {tap} from 'rxjs/operators'
import {PersonInterface} from '../../types/person.interface'
import {changeValuesAction} from './store/actions/change-values.action'
import {personSelector} from './store/selectors'
import {initialState} from './store/state'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
  roles = ['Отправитель', 'Получатель']

  form = this.fb.group({
    lastName: [initialState.lastName, Validators.required],
    firstName: [initialState.firstName, Validators.required],
    middleName: [initialState.middleName, Validators.required],
    email: [initialState.email, Validators.required],
    phone: [initialState.phone, Validators.required],
    role: [initialState.role, Validators.required],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          tap((values: PersonInterface) => {
            this.store.dispatch(changeValuesAction(values))
          })
        )
        .subscribe(),
    () => this.store.select(personSelector)
  )

  constructor(private fb: FormBuilder, private store: Store) {}
}
