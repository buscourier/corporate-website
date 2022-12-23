import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {NavigationEnd, Router, RouterEvent} from '@angular/router'
import {Store} from '@ngrx/store'
import {TuiDestroyService, TuiScrollService} from '@taiga-ui/cdk'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {filter, switchMap, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {setCurrentStepAction} from './store/actions/set-current-step.action'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    tuiLoaderOptionsProvider({
      size: 'm',
    }),
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  currentStepIndex = 0
  scrollTop = 150
  duration = 300

  form = this.fb.group({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    @Inject(TuiScrollService) private readonly scrollService: TuiScrollService,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.navigate(this.router.url)
    this.scroll().pipe(takeUntil(this.destroy$)).subscribe()

    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        tap((event: RouterEvent) => {
          this.navigate(event.url)
        }),
        switchMap(() => {
          return this.scroll()
        })
      )
      .pipe(takeUntil(this.destroy$))
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
