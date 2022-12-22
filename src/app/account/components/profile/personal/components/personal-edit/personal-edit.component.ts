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
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {filter, map, Observable, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {PersonalProfileInterface} from '../../types/personal-profile.interface'
import {getPersonalProfileAction} from './store/actions/get-personal-profile.action'
import {updatePersonalProfileAction} from './store/actions/update-personal-profile.action'
import {
  isProfileLoadingSelector,
  isSubmittingSelector,
  personalProfileSelector,
} from './store/selectors'

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
    TuiDestroyService,
  ],
})
export class PersonalEditComponent implements OnInit {
  isProfileLoading$: Observable<boolean>
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
          return this.store.dispatch(
            getPersonalProfileAction({userId: user.id})
          )
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  initializeValues(): void {
    this.isProfileLoading$ = this.store.select(isProfileLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.store
      .select(personalProfileSelector)
      .pipe(
        filter(Boolean),
        tap((profile: PersonalProfileInterface) => {
          this.profile = profile
          this.initializeForm()
        }),
        takeUntil(this.destroy$)
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
  }
}
