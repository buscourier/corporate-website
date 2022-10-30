import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {}
