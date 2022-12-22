import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {filter, map, Observable, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {EntityProfileInterface} from '../../types/entity-profile.interface'
import {getEntityProfileAction} from './store/actions/get-entity-profile.action'
import {updateEntityProfileAction} from './store/actions/update-entity-profile.action'
import {
  entityProfileSelector,
  isProfileLoadingSelector,
  isSubmittingSelector,
} from './store/selectors'

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityEditComponent implements OnInit {
  isProfileLoading$: Observable<boolean>
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
  })

  constructor(
    private store: Store,
    private fb: FormBuilder,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  initializeValues(): void {
    this.isProfileLoading$ = this.store.select(isProfileLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.store
      .select(entityProfileSelector)
      .pipe(
        filter(Boolean),
        tap((profile: EntityProfileInterface) => {
          this.profile = profile
          this.initializeForm()
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: {
        value: this.profile.name.value,
        disabled: this.profile.name.edit == 0,
      },
      contactperson: {
        value: this.profile.contactperson.value,
        disabled: this.profile.contactperson.edit == 0,
      },
      phone: {
        value: this.profile.phone.value,
        disabled: this.profile.phone.edit == 0,
      },
      inn: {
        value: this.profile.inn.value,
        disabled: this.profile.inn.edit == 0,
      },
      kpp: {
        value: this.profile.kpp.value,
        disabled: this.profile.kpp.edit == 0,
      },
      ogrn: {
        value: this.profile.ogrn.value,
        disabled: this.profile.ogrn.edit == 0,
      },
      bank: {
        value: this.profile.bank.value,
        disabled: this.profile.bank.edit == 0,
      },
      rs: {value: this.profile.rs.value, disabled: this.profile.rs.edit == 0},
      ks: {value: this.profile.ks.value, disabled: this.profile.ks.edit == 0},
      contractNumber: {
        value: this.profile.contractID.value,
        disabled: this.profile.contractID.edit == 0,
      },
      contractDate: {
        value: this.profile.contractDate.value,
        disabled: this.profile.contractDate.edit == 0,
      },
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
  }
}
