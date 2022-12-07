import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {NavigationEnd, Router, RouterEvent} from '@angular/router'
import {Store} from '@ngrx/store'
import {TuiScrollService} from '@taiga-ui/cdk'
import {filter, Subscription, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {setCurrentStepAction} from './store/actions/set-current-step.action'

class NavigationEvent {}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, OnDestroy {
  currentStepIndex = 0
  scrollTop = 150
  duration = 300
  routerSub: Subscription

  form = this.fb.group({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    @Inject(TuiScrollService) private readonly scrollService: TuiScrollService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe()
  }

  initializeValues(): void {
    this.navigate(this.router.url)
    this.routerSub = this.scroll().subscribe()

    this.routerSub = this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        tap((event: RouterEvent) => {
          this.navigate(event.url)
        }),
        switchMap((event: NavigationEvent) => {
          return this.scroll()
        })
      )
      .subscribe()
  }

  navigate(url: string): void {
    const currentStep = this.getCurrentStep(url)

    this.store.dispatch(setCurrentStepAction({step: currentStep}))
  }

  scroll() {
    return this.scrollService.scroll$(
      document.documentElement,
      this.scrollTop,
      0,
      this.duration
    )
  }

  getCurrentStep(url: string): number {
    const arr = url.split('/').map((step: string) => {
      return step === 'checkout' ? 0 : step === 'account' ? 1 : Number(step)
    })

    return arr[arr.length - 1]
  }

  onSubmit() {
    alert(1)
  }
}
