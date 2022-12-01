import {ChangeDetectionStrategy, Component} from '@angular/core'

interface ExampleInterface {
  heading: string
  link: string
}

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesComponent {
  index = 0

  readonly examples: ExampleInterface[] = [
    {
      heading: '«Доставка цветов из аэропорта по Приморскому краю за 24 часа»',
      link: '',
    },
    {
      heading: '«Подарки для близких, которые сейчас далеко»',
      link: '',
    },
    {
      heading: '«Доставим даже в тайгу»',
      link: '',
    },
  ]

  constructor() {}

  onIndex(index: number): void {
    this.index = index
  }
}
