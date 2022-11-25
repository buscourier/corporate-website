import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {map, Observable, Subscription} from 'rxjs'
import {LoginService} from 'src/app/auth/components/login/services/login.service'
import {
  isAnonymousSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors'
import {setCurrentStepStateAction} from '../../store/actions/set-current-step-state.action'
import {isPersonValidSelector} from './components/person/store/selectors'
import {setActiveTabAction} from './store/actions/set-active-tab.action'
import {activeTabSelector} from './store/selectors'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit, OnDestroy {
  activeTabIndex$: Observable<number>
  isLoggedIn$: Observable<boolean>
  isAnonymous$: Observable<boolean>

  isPersonValidSub: Subscription

  constructor(private store: Store, private loginService: LoginService) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.isPersonValidSub.unsubscribe()
  }

  initializeValues(): void {
    this.activeTabIndex$ = this.store.select(activeTabSelector)
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.isAnonymous$ = this.store.select(isAnonymousSelector)

    this.isPersonValidSub = this.store
      .select(isPersonValidSelector)
      .pipe(
        map((isValid: boolean) => {
          return this.store.dispatch(setCurrentStepStateAction({isValid}))
        })
      )
      .subscribe()
  }

  setActiveTabIndex(index: number) {
    this.store.dispatch(setActiveTabAction({activeTabIndex: index}))
  }

  login() {
    this.loginService.open(null).subscribe()
  }
}
