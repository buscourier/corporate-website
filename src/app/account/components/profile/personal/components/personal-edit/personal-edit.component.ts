import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {PersonalProfileInterface} from '../../types/personal-profile.interface'
import {Store} from '@ngrx/store'
import {getPersonalProfileAction} from './store/actions/get-personal-profile.action'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {tap} from 'rxjs/operators'
import {
  isLoadingSelector,
  isSubmittingSelector,
  personalProfileSelector,
} from './store/selectors'
import {FormBuilder, FormGroup} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiAlertService, TuiNotification} from '@taiga-ui/core'
import {updatePersonalProfileAction} from './store/actions/update-personal-profile.action'

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
      },
    },
  ],
})
export class PersonalEditComponent implements OnInit {
  isLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  isSubmitting$: Observable<boolean>
  profile: PersonalProfileInterface
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
          return this.store.dispatch(
            getPersonalProfileAction({userId: user.id})
          )
        })
      )
      .subscribe()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.store
      .select(personalProfileSelector)
      .pipe(
        filter(Boolean),
        tap((profile: PersonalProfileInterface) => {
          this.profile = profile
          this.initializeForm()
        })
      )
      .subscribe()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      fio: {
        value: this.profile['contactperson'].value,
        disabled: this.profile['contactperson'].edit == '0',
      },
      email: {
        value: this.profile['email'].value,
        disabled: this.profile['email'].edit == '0',
      },
      phone: {
        value: this.profile['phone'].value,
        disabled: this.profile['phone'].edit == '0',
      },
      passport: {
        value: this.profile['passport'].value,
        disabled: this.profile['passport'].edit == '0',
      },
    })
  }

  onSubmit() {
    const profileInput: any = {
      ...this.profile,
      ...this.form.value,
    }

    this.store.dispatch(
      updatePersonalProfileAction({
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
