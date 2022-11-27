import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest, map, Subscription} from 'rxjs'
import {isEndPointValidSelector} from 'src/app/new-order/shared/components/end-point/store/selectors'
import {isOrdersValidSelector} from '../../../../shared/components/orders/store/selectors'
import {setCurrentStepStateAction} from '../../store/actions/set-current-step-state.action'
import {isRecipientValidSelector} from './components/recipient/store/selectors'

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent implements OnInit, OnDestroy {
  combineAllSub: Subscription
  isEndpointValid = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.combineAllSub = combineLatest([
      this.store.select(isEndPointValidSelector),
      this.store.select(isOrdersValidSelector),
      this.store.select(isRecipientValidSelector),
    ])
      .pipe(
        map(([isEndpointValid, isOrdersValid, isRecipientValid]) => {
          this.isEndpointValid = isEndpointValid

          return this.store.dispatch(
            setCurrentStepStateAction({
              isValid: isEndpointValid && isOrdersValid && isRecipientValid,
            })
          )
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.combineAllSub.unsubscribe()
  }
}
