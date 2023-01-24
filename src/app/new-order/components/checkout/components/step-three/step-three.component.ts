import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {combineLatest, map, takeUntil} from 'rxjs'
import {isEndPointValidSelector} from 'src/app/new-order/shared/components/end-point/store/selectors'
import {isOrdersValidSelector} from '../../../../shared/components/orders/store/selectors'
import {setCurrentStepStateAction} from '../../store/actions/set-current-step-state.action'
import {isRecipientValidSelector} from './components/recipient/store/selectors'

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent implements OnInit {
  isEndpointValid = false
  isCurrentStepValid = false

  constructor(
    private store: Store,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(isEndPointValidSelector),
      this.store.select(isOrdersValidSelector),
      this.store.select(isRecipientValidSelector),
    ])
      .pipe(
        map(([isEndpointValid, isOrdersValid, isRecipientValid]) => {
          this.isEndpointValid = isEndpointValid
          this.isCurrentStepValid =
            isEndpointValid && isOrdersValid && isRecipientValid

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
