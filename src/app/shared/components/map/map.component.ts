import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {MapPointInterface} from '../../types/map-point.interface'
import {YaEvent} from 'angular8-yandex-maps'

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
  @Input() zoom: number = 12
  @Input() disableDefaultUI: boolean = true
  @Input() gestureHandling: boolean
  @Input() scrollwheel: boolean

  placemarkProperties: ymaps.IPlacemarkProperties = {
    hintContent: 'Hint content',
    balloonContent: 'Baloon content',
  }

  placemarkOptions: ymaps.IPlacemarkOptions = {
    iconLayout: 'default#image',
    iconImageHref: '/assets/icons/map-point.svg',
    iconImageSize: [32, 32],
  }

  zoomScroll({event}: YaEvent<ymaps.Map>) {
    event.preventDefault()
  }

  ready() {
    console.log('ready!!!')
  }
}
