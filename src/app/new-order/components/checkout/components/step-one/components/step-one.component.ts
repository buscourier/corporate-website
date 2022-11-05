import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {using} from 'rxjs'
import {tap} from 'rxjs/operators'
import {personValueChangesAction} from '../store/actions/person-value-chages.action'
import {personSelector} from '../store/selectors'
import {initialState} from '../store/state'
import {PersonInterface} from '../types/person.interface'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent {
  activeTabIndex = 0
  roles = ['Отправитель', 'Получатель']

  person = this.fb.group({
    lastName: [initialState.person.lastName, Validators.required],
    firstName: [initialState.person.firstName, Validators.required],
    middleName: [initialState.person.middleName, Validators.required],
    email: [initialState.person.email, Validators.required],
    phone: [initialState.person.phone, Validators.required],
    role: [initialState.person.role, Validators.required],
  })

  personValues$ = using(
    () =>
      this.person.valueChanges
        .pipe(
          tap((values: PersonInterface) => {
            this.store.dispatch(personValueChangesAction(values))
          })
        )
        .subscribe(),
    () => this.store.select(personSelector)
  )

  form = this.fb.group({
    person: this.person,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    console.log(this.form.value)
  }
}
