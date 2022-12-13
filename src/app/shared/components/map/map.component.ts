import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {YaEvent} from 'angular8-yandex-maps'
import {OfficeInterface} from '../../types/office.interface'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() points: OfficeInterface[]
  @Input() latitude: number
  @Input() longitude: number
  @Input() zoom: number = 12
  @Input() disableDefaultUI: boolean = true
  @Input() gestureHandling: boolean
  @Input() scrollwheel: boolean
  @Input() disableScrollZoom = false
  @Input() showHint = true
  @Input() showBalloon = false
  @Input('showLoader') showLoaderProps = false

  @Output() pointSelect: EventEmitter<any> = new EventEmitter<any>()

  isLoading = true

  zoomControlParameters: ymaps.control.IZoomControlParameters = {
    options: {
      position: {
        bottom: 50,
        right: 25,
      },
    },
  }

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
    if (this.disableScrollZoom) {
      event.preventDefault()
    }
  }

  ready() {
    this.isLoading = false
  }

  selectPoint(point) {
    this.pointSelect.emit(point)
  }
}
