import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {PersonalProfileInterface} from '../../types/personal-profile.interface'
import {Store} from '@ngrx/store'
import {getPersonalProfileAction} from './store/actions/get-personal-profile.action'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {tap} from 'rxjs/operators'
import {isLoadingSelector, personalProfileSelector} from './store/selectors'
import {FormBuilder, FormGroup} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiAlertService, TuiNotification} from '@taiga-ui/core'

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
  profile: PersonalProfileInterface

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
          return this.store.dispatch(
            getPersonalProfileAction({userId: user.id})
          )
        })
      )
      .subscribe()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
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

    console.log('profileInput', profileInput)

    this.alertService
      .open(`Данные успешно сохранены`, {
        label: `Изменения данных!`,
        // status: TuiNotification.Success,
      })
      .subscribe()
  }
}
