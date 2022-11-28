import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesComponent {
  index = 2

  readonly items = [
    `John Cleese`,
    `Eric Idle`,
    `Michael Palin`,
    `Graham Chapman`,
    `Terry Gilliam`,
    `Terry Jones`,
  ]

  constructor() {}
}
