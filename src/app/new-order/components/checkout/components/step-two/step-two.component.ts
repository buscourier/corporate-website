import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest, map, Subscription} from 'rxjs'
import {isStartPointValidSelector} from '../../../../shared/components/start-point/store/selectors'
import {setCurrentStepStateAction} from '../../store/actions/set-current-step-state.action'
import {isSenderValidSelector} from './components/sender/store/selectors'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit, OnDestroy {
  combineAllSub: Subscription

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.combineAllSub = combineLatest([
      this.store.select(isSenderValidSelector),
      this.store.select(isStartPointValidSelector),
    ])
      .pipe(
        map(([isSenderValid, isStartPointValid]) => {
          return this.store.dispatch(
            setCurrentStepStateAction({
              isValid: isSenderValid && isStartPointValid,
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
