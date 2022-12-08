import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {filter, Observable, of, Subscription, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {currentUserSelector} from '../../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {ProxyPersonInterface} from '../../../../../../shared/types/proxy-person.interface'
import {getEntityProfileAction} from './store/actions/get-entity-profile.action'
import {getProxyAction} from './store/actions/get-proxy.action'
import {
  entityProfileSelector,
  isProfileLoadingSelector,
  isProxyLoadingSelector,
  proxySelector,
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
export class EntityViewComponent implements OnInit, OnDestroy {
  isProfileLoading$: Observable<boolean>
  isProxyLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  profile$: Observable<null | any>
  proxySub: Subscription

  proxies = this.fb.array([this.fb.control('')])

  form = this.fb.group({
    proxies: this.proxies,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.proxySub.unsubscribe()
  }

  initializeValues(): void {
    this.isProfileLoading$ = this.store.select(isProfileLoadingSelector)
    this.isProxyLoading$ = this.store.select(isProxyLoadingSelector)
    this.profile$ = this.store
      .select(entityProfileSelector)
      .pipe(filter(Boolean))

    this.proxySub = this.store
      .select(proxySelector)
      .pipe(
        tap((proxy: ProxyPersonInterface[]) => {
          console.log('proxy', proxy)
        })
      )
      .subscribe()
  }

  fetchData(): void {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        tap((user: CurrentUserInterface) => {
          this.store.dispatch(getEntityProfileAction({userId: user.id}))
        }),
        switchMap((user: CurrentUserInterface) => {
          this.store.dispatch(getProxyAction({userId: user.id}))
          return of(user)
        })
      )
      .subscribe()
  }
}
