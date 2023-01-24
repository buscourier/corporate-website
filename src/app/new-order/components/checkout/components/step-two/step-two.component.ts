import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {combineLatest, map, Observable, takeUntil} from 'rxjs'
import {isEntitySelector} from '../../../../../auth/store/selectors'
import {isStartPointValidSelector} from '../../../../shared/components/start-point/store/selectors'
import {setCurrentStepStateAction} from '../../store/actions/set-current-step-state.action'
import {isSenderValidSelector} from './components/sender/store/selectors'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit {
  isEntity$: Observable<boolean>
  isCurrentStepValid = false

  constructor(
    private store: Store,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.isEntity$ = this.store.select(isEntitySelector)

    combineLatest([
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }
}
