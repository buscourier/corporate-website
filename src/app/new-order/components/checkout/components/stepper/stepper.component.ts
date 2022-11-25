import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {
  currentStepSelector,
  finishedStepsSelector,
  isCurrentStepValidSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements OnInit {
  currentStep$: Observable<number>
  isCurrentStepValid$: Observable<boolean>
  finishedSteps$: Observable<{[key: number]: boolean}>

  steps = ['Автор заявки', 'Отправитель груза', 'Параметры груза', 'Завершение']

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.currentStep$ = this.store.select(currentStepSelector)
    this.isCurrentStepValid$ = this.store.select(isCurrentStepValidSelector)
    this.finishedSteps$ = this.store.select(finishedStepsSelector)
  }
}
