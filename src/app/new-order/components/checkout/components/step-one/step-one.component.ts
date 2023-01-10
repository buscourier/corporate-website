import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {delay, map, Observable, Subscription, take, takeUntil} from 'rxjs'
import {LoginService} from 'src/app/auth/components/login/services/login.service'
import {
  isAnonymousSelector,
  isEntitySelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors'
import {setCurrentStepStateAction} from '../../store/actions/set-current-step-state.action'
import {isPersonValidSelector} from './components/person/store/selectors'
import {setActiveTabAction} from './store/actions/set-active-tab.action'
import {activeTabSelector} from './store/selectors'
import {tap} from 'rxjs/operators'
import {Router} from '@angular/router'
import {TuiDestroyService} from '@taiga-ui/cdk'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit {
  activeTabIndex$: Observable<number>
  isLoggedIn$: Observable<boolean>
  isAnonymous$: Observable<boolean>
  isCurrentStepValid = false

  constructor(
    private store: Store,
    private loginService: LoginService,
    private router: Router,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.activeTabIndex$ = this.store.select(activeTabSelector)
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.isAnonymous$ = this.store.select(isAnonymousSelector)

    this.store
      .select(isEntitySelector)
      .pipe(
        delay(0), // fix: ExpressionChangedAfterItHasBeenCheckedError
        tap((isEntity: boolean) => {
          if (isEntity) {
            this.router.navigate(['/new-order', 'checkout', '1'])
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.store
      .select(isPersonValidSelector)
      .pipe(
        map((isValid: boolean) => {
          this.isCurrentStepValid = isValid
          return this.store.dispatch(setCurrentStepStateAction({isValid}))
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  setActiveTabIndex(index: number) {
    this.store.dispatch(setActiveTabAction({activeTabIndex: index}))
  }

  login() {
    this.loginService.open(null).pipe(take(1)).subscribe()
  }
}
