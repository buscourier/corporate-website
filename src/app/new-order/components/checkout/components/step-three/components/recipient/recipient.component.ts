import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {tap, using} from 'rxjs'
import {Store} from '@ngrx/store'
import {RecipientStateInterface} from './types/recipient-state.interface'
import {changeValuesAction} from './store/actions/change-values.action'
import {recipientSelector} from './store/selectors'

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
          })
        )
        .subscribe(),
    () => this.store.select(recipientSelector)
  )

  constructor(private fb: FormBuilder, private store: Store) {}
}
