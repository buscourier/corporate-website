import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Subscription, tap, using} from 'rxjs'
import {changeValidityAction} from './store/actions/change-validity.action'
import {changeValuesAction} from './store/actions/change-values.action'
import {isSenderPristineSelector, senderSelector} from './store/selectors'
import {SenderStateInterface} from './types/sender-state.interface'

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent implements OnInit, OnDestroy {
  documents = ['Паспорт РФ', 'Водительское удостоверение', 'Другое']

  form = this.fb.group({
    fio: ['', Validators.required],
    docType: ['', Validators.required],
    docNumber: ['', Validators.required],
    phone: ['', Validators.required],
  })

  isSenderPristineSub: Subscription

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
  }

  ngOnDestroy(): void {
    this.isSenderPristineSub.unsubscribe()
  }
}
