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
  profile: EntityProfileInterface
  currentUserId: string

  form: FormGroup = this.fb.group({
    fio: '',
    email: '',
    phone: '',
    passport: '',
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
      fio: this.profile['contactperson'].value,
      email: this.profile['email'].value,
      phone: this.profile['phone'].value,
      passport: this.profile['passport'].value,
    })
  }

  onSubmit() {
    const profileInput: any = {
      ...this.profile,
      ...this.form.value,
    }

    // this.store.dispatch(
    //   updatePersonalProfileAction({
    //     currentUserId: this.currentUserId,
    //     profileInput,
    //   })
    // )

    this.alertService
      .open(`Ошибка сохранения данных`, {
        label: `Изменения данных!`,
        // status: TuiNotification.Error,
      })
      .subscribe()
  }
}
