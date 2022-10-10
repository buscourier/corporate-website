import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {concatAll, filter, map, Observable, of, switchMap, toArray} from 'rxjs'
import {PersonalProfileInterface} from '../../types/personal-profile.interface'
import {Store} from '@ngrx/store'
import {getPersonalProfileAction} from './store/actions/get-personal-profile.action'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {isLoadingSelector, personalProfileSelector} from './store/selectors'
import {ProfileInterface} from '../../../shared/types/profile.interface'

@Component({
  selector: 'app-personal-view',
  templateUrl: './personal-view.component.html',
  styleUrls: ['./personal-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalViewComponent implements OnInit {
  isLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  profile$: Observable<null | PersonalProfileInterface>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.profile$ = this.store.select(personalProfileSelector).pipe(
      filter(Boolean),
      map((profile: PersonalProfileInterface) => {
        console.log('profile', profile)
        return [...profile].reduce((arr, item) => {
          return item.alias === 'login' ||
            item.alias === 'email' ||
            item.alias === 'phone'
            ? arr.concat(item)
            : arr.concat(null)
        }, [])
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
