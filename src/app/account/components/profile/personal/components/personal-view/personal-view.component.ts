import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {getPersonalProfileAction} from './store/actions/get-personal-profile.action'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {isLoadingSelector, personalProfileSelector} from './store/selectors'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-personal-view',
  templateUrl: './personal-view.component.html',
  styleUrls: ['./personal-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiLoaderOptionsProvider({
      size: 'l',
      inheritColor: false,
      overlay: false,
    }),
  ],
})
export class PersonalViewComponent implements OnInit {
  isLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  profile$: Observable<null | any>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
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
}
