import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements OnChanges, AfterViewInit {
  @Input() currentStepIndex = 0
  @ViewChild('stepper', {read: ElementRef}) stepper: ElementRef

  steps = ['Автор заявки', 'Отправитель груза', 'Параметры груза', 'Завершение']
  nodes = []

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const previousStep =
      changes['currentStepIndex'] && changes['currentStepIndex'].previousValue
    const currentStep =
      changes['currentStepIndex'] && changes['currentStepIndex'].currentValue

    if (this.nodes && currentStep > previousStep) {
      this.nodes[previousStep].classList.add('done')
    } else if (this.nodes && currentStep < previousStep) {
      this.nodes[previousStep].classList.remove('done')
      this.nodes[currentStep].classList.remove('done')
    }
  }

  ngAfterViewInit(): void {
    this.nodes = this.stepper.nativeElement.children
  }
}
