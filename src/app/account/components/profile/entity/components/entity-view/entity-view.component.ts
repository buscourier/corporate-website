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
import {ConfidantInterface} from '../../../../../../shared/types/confidant.interface'
import {CurrentUserInterface} from '../../../../../../shared/types/current-user.interface'
import {getConfidantsAction} from './store/actions/get-confidants.action'
import {getEntityProfileAction} from './store/actions/get-entity-profile.action'
import {
  confidantsSelector,
  entityProfileSelector,
  isConfidantsLoadingSelector,
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
export class EntityViewComponent implements OnInit, OnDestroy {
  isProfileLoading$: Observable<boolean>
  isConfidantsLoading$: Observable<boolean>
  backendErrors$: Observable<null | string>
  profile$: Observable<null | any>
  confidantsSub: Subscription

  index = 0

  confidants = this.fb.array([])

  form = this.fb.group({
    confidants: this.confidants,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.confidantsSub.unsubscribe()
  }

  initializeValues(): void {
    this.isProfileLoading$ = this.store.select(isProfileLoadingSelector)
    this.isConfidantsLoading$ = this.store.select(isConfidantsLoadingSelector)
    this.profile$ = this.store
      .select(entityProfileSelector)
      .pipe(filter(Boolean))

    this.confidantsSub = this.store
      .select(confidantsSelector)
      .pipe(
        filter(Boolean),
        tap((confidants: ConfidantInterface[]) => {
          confidants.forEach(({name, phone}: ConfidantInterface) => {
            this.confidants.push(
              this.fb.control({
                name,
                phone,
                docNumber: '',
              })
            )
          })
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
          this.store.dispatch(getConfidantsAction({userId: user.id}))
          return of(user)
        })
      )
      .subscribe()
  }

  onIndex(index: number): void {
    this.index = index
  }
}
