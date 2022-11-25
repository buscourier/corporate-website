import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {NavigationEnd, Router, RouterEvent} from '@angular/router'
import {Store} from '@ngrx/store'
import {filter} from 'rxjs'
import {setCurrentStepAction} from './store/actions/set-current-step.action'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  currentStepIndex = 0

  form = this.fb.group({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.navigate(this.router.url)

    //TODO: need unsubscribe?
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        this.navigate(event.url)
      })
  }

  navigate(url: string): void {
    const currentStep = this.getCurrentStep(url)

    this.store.dispatch(setCurrentStepAction({step: currentStep}))
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
