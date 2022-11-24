import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {LoginService} from 'src/app/auth/components/login/services/login.service'
import {
  isAnonymousSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors'
import {setActiveTabAction} from './store/actions/set-active-tab.action'
import {activeTabSelector} from './store/selectors'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit {
  activeTabIndex$: Observable<number>
  isLoggedIn$: Observable<boolean>
  isAnonymous$: Observable<boolean>

  constructor(private store: Store, private loginService: LoginService) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.activeTabIndex$ = this.store.select(activeTabSelector)
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.isAnonymous$ = this.store.select(isAnonymousSelector)
  }

  setActiveTabIndex(index: number) {
    this.store.dispatch(setActiveTabAction({activeTabIndex: index}))
  }

  login() {
    this.loginService.open(null).subscribe()
  }
}
