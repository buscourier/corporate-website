import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  linesLimit = 8

  toggleLinesClamp(): void {
    this.linesLimit = this.collpasedLines ? 28 : 8
  }

  private get collpasedLines(): boolean {
    return this.linesLimit === 8
  }

  get isClampActive() {
    return this.linesLimit === 28
  }
}
