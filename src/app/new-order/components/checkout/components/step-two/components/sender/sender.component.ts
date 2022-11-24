import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {tap, using} from 'rxjs'
import {FormBuilder, Validators} from '@angular/forms'
import {senderSelector} from './store/selectors'
import {SenderStateInterface} from './types/sender-state.interface'
import {Store} from '@ngrx/store'
import {changeValuesAction} from './store/actions/change-values.action'

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent {
  documents = ['Паспорт РФ', 'Водительское удостоверение', 'Другое']

  form = this.fb.group({
    fio: ['', Validators.required],
    docType: ['', Validators.required],
    docNumber: ['', Validators.required],
    phone: ['', Validators.required],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          tap((values: SenderStateInterface) => {
            this.store.dispatch(changeValuesAction(values))
          })
        )
        .subscribe(),
    () => this.store.select(senderSelector)
  )

  constructor(private fb: FormBuilder, private store: Store) {}

  // ngOnInit(): void {
  // }
}
