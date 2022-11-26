import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {MapPointInterface} from '../../types/map-point.interface'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() points: MapPointInterface[]
  @Input() latitude: number
  @Input() longitude: number
  @Input() zoom: number
  @Input() disableDefaultUI: boolean
  @Input() gestureHandling: boolean
  @Input() scrollwheel: boolean
}
