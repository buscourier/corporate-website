import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {tap} from 'rxjs/operators'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {entityProfileSelector, isLoadingSelector} from './store/selectors'
import {getEntityProfileAction} from './store/actions/get-entity-profile.action'

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiLoaderOptionsProvider({
      size: 'l',
      inheritColor: false,
      overlay: false,
    }),
  ],
})
export class EntityViewComponent implements OnInit {
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
    this.profile$ = this.store.select(entityProfileSelector).pipe(
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
          return this.store.dispatch(getEntityProfileAction({userId: user.id}))
        })
      )
      .subscribe()
  }
}
