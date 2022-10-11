import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {FormBuilder, FormGroup} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiAlertService} from '@taiga-ui/core'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {tap} from 'rxjs/operators'
import {EntityProfileInterface} from '../../types/entity-profile.interface'
import {getEntityProfileAction} from './store/actions/get-entity-profile.action'
import {
  entityProfileSelector,
  isLoadingSelector,
  isSubmittingSelector,
} from './store/selectors'
import {updateEntityProfileAction} from './store/actions/update-entity-profile.action'

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityEditComponent implements OnInit {
  isLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  isSubmitting$: Observable<boolean>
  profile: any
  currentUserId: string

  form: FormGroup = this.fb.group({
    name: '',
    contactperson: '',
    phone: '',
    inn: '',
    kpp: '',
    ogrn: '',
    bank: '',
    rs: '',
    ks: '',
    contractNumber: '',
    contractDate: '',
    driver: '',
  })

  constructor(
    private store: Store,
    private fb: FormBuilder,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  fetchData(): void {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        map((user: CurrentUserInterface) => {
          this.currentUserId = user.id
          return this.store.dispatch(getEntityProfileAction({userId: user.id}))
        })
      )
      .subscribe()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.store
      .select(entityProfileSelector)
      .pipe(
        filter(Boolean),
        tap((profile: EntityProfileInterface) => {
          this.profile = profile
          this.initializeForm()
        })
      )
      .subscribe()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: this.profile.name.value,
      contactperson: this.profile.contactperson.value,
      phone: this.profile.phone.value,
      inn: this.profile.inn.value,
      kpp: this.profile.kpp.value,
      ogrn: this.profile.ogrn.value,
      bank: this.profile.bank.value,
      rs: this.profile.rs.value,
      ks: this.profile.ks.value,
      contractNumber: this.profile.contractID.value,
      contractDate: this.profile.contractDate.value,
      driver: '',
    })
  }

  onSubmit() {
    const profileInput: any = {
      ...this.profile,
      ...this.form.value,
    }

    this.store.dispatch(
      updateEntityProfileAction({
        currentUserId: this.currentUserId,
        profileInput,
      })
    )

    this.alertService
      .open(`Ошибка сохранения данных`, {
        label: `Изменения данных!`,
        // status: TuiNotification.Error,
      })
      .subscribe()
  }
}
