import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {YaEvent} from 'angular8-yandex-maps'
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
  @Input() zoom: number = 12
  @Input() disableDefaultUI: boolean = true
  @Input() gestureHandling: boolean
  @Input() scrollwheel: boolean

  @Output() pointSelect: EventEmitter<any> = new EventEmitter<any>()

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

  go(point) {
    this.pointSelect.emit(point)
  }
}
