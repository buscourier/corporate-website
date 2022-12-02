import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {CitiesGroupInterface} from '../../types/cities-group.interface'
import {CityNameType} from '../../types/city-name.type'

@Component({
  selector: 'app-cities-group',
  templateUrl: './cities-group.component.html',
  styleUrls: ['./cities-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesGroupComponent {
  @Input('group') groupProps: CitiesGroupInterface

  constructor() {}

  get group(): {cities: CityNameType[]; key: string} {
    return Object.entries(this.groupProps).map(([key, cities]) => ({
      key,
      cities,
    }))[0]
  }
}
