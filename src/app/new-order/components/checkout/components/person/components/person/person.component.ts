import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {using} from 'rxjs'
import {tap} from 'rxjs/operators'
import {valueChangesAction} from '../../store/actions/value-chages.action'
import {initialState} from '../../store/state'
import {PersonStateInterface} from '../../types/person-state.interface'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {
  form = this.fb.group({
    name: [initialState.name],
    email: [initialState.email],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          tap((values: PersonStateInterface) => {
            this.store.dispatch(valueChangesAction(values))
          })
        )
        .subscribe(),
    () => this.store.select((state: any) => state.person)
  )

  constructor(private fb: FormBuilder, private store: Store) {}

  // ngOnInit(): void {
  //
  // }
}
