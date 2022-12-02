import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

@Component({
  selector: 'app-cities-block',
  templateUrl: './cities-block.component.html',
  styleUrls: ['./cities-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesBlockComponent {
  @Input() letter: string
  @Input() cities: any

  constructor() {}
}
