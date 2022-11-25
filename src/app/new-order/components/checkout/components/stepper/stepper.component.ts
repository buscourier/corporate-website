import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {
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
  @Input() currentStepIndex = 0
  // @ViewChild('stepper', {read: ElementRef}) stepper: ElementRef

  isCurrentStepValid$: Observable<boolean>
  finishedSteps$: Observable<{[key: number]: boolean}>

  steps = ['Автор заявки', 'Отправитель груза', 'Параметры груза', 'Завершение']
  // nodes = []

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isCurrentStepValid$ = this.store.select(isCurrentStepValidSelector)
    this.finishedSteps$ = this.store.select(finishedStepsSelector)
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const previousStep =
  //     changes['currentStepIndex'] && changes['currentStepIndex'].previousValue
  //   const currentStep =
  //     changes['currentStepIndex'] && changes['currentStepIndex'].currentValue
  //
  //   if (this.nodes && currentStep > previousStep) {
  //     this.nodes[previousStep].classList.add('done')
  //   } else if (this.nodes && currentStep < previousStep) {
  //     this.nodes[previousStep].classList.remove('done')
  //     this.nodes[currentStep].classList.remove('done')
  //   }
  // }

  // ngAfterViewInit(): void {
  //   this.nodes = this.stepper.nativeElement.children
  // }
}
