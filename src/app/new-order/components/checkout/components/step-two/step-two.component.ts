import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest, map, Observable, Subscription} from 'rxjs'
import {isEntitySelector} from '../../../../../auth/store/selectors'
import {isStartPointValidSelector} from '../../../../shared/components/start-point/store/selectors'
import {setCurrentStepStateAction} from '../../store/actions/set-current-step-state.action'
import {isSenderValidSelector} from './components/sender/store/selectors'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit, OnDestroy {
  isEntity$: Observable<boolean>
  combineAllSub: Subscription
  isCurrentStepValid = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isEntity$ = this.store.select(isEntitySelector)

    this.combineAllSub = combineLatest([
      this.store.select(isSenderValidSelector),
      this.store.select(isStartPointValidSelector),
    ])
      .pipe(
        map(([isSenderValid, isStartPointValid]) => {
          this.isCurrentStepValid = isSenderValid && isStartPointValid

          return this.store.dispatch(
            setCurrentStepStateAction({
              isValid: this.isCurrentStepValid,
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
