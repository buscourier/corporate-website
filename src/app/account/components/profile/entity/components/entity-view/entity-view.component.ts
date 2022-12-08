import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {filter, map, Observable} from 'rxjs'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {getEntityProfileAction} from './store/actions/get-entity-profile.action'
import {
  entityProfileSelector,
  isProfileLoadingSelector,
} from './store/selectors'

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
  isProfileLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  profile$: Observable<null | any>

  proxies = this.fb.array([this.fb.control('')])

  form = this.fb.group({
    proxies: this.proxies,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isProfileLoading$ = this.store.select(isProfileLoadingSelector)
    this.profile$ = this.store
      .select(entityProfileSelector)
      .pipe(filter(Boolean))
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
