import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {tap, using} from 'rxjs'
import {changeValidityAction} from './store/actions/change-validity.action'
import {changeValuesAction} from './store/actions/change-values.action'
import {recipientSelector} from './store/selectors'
import {RecipientStateInterface} from './types/recipient-state.interface'

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipientComponent {
  form = this.fb.group({
    fio: ['', Validators.required],
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
}
