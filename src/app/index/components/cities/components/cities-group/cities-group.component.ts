import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

@Component({
  selector: 'app-cities-group',
  templateUrl: './cities-group.component.html',
  styleUrls: ['./cities-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesGroupComponent {
  @Input() letter: string
  @Input() cities: any

  constructor() {}
}
