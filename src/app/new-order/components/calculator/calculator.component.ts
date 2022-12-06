import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {isPhoneScreenSelector} from '../../../store/global/selectors'
import {endPointSelector} from '../../shared/components/end-point/store/selectors'
import {EndPointStateInterface} from '../../shared/components/end-point/types/end-point-state.interface'
import {isOrdersValidSelector} from '../../shared/components/orders/store/selectors'
import {startPointSelector} from '../../shared/components/start-point/store/selectors'
import {StartPointStateInterface} from '../../shared/components/start-point/types/start-point-state.interface'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements OnInit {
  linesLimit = 8
  isOrdersValid$: Observable<boolean>
  startPoint$: Observable<StartPointStateInterface>
  endPoint$: Observable<EndPointStateInterface>
  isPhoneScreen$: Observable<boolean>

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isOrdersValid$ = this.store.select(isOrdersValidSelector)
    this.startPoint$ = this.store.select(startPointSelector)
    this.endPoint$ = this.store.select(endPointSelector)
    this.isPhoneScreen$ = this.store.select(isPhoneScreenSelector)
  }

  toggleLinesClamp(): void {
    this.linesLimit = this.collpasedLines ? 28 : 8
  }

  private get collpasedLines(): boolean {
    return this.linesLimit === 8
  }

  get isClampActive() {
    return this.linesLimit === 28
  }

  goToCheckout() {
    this.router.navigate(['new-order', 'checkout'])
  }
}
