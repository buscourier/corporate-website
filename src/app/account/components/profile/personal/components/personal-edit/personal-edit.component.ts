import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
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
  form: FormGroup
  isLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  profile$: Observable<null | PersonalProfileInterface>

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
    this.initializeForm()
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
    this.profile$ = this.store.select(personalProfileSelector).pipe(
      filter(Boolean),
      tap((profile) => {
        console.log('profile', profile)
      })
    )
  }

  initializeForm(): void {
    this.form = this.fb.group({
      fio: '',
      email: '',
      phone: '',
      passport: '',
    })
  }
}
