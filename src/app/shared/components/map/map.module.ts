import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiLoaderModule} from '@taiga-ui/core'
import {AngularYandexMapsModule} from 'angular8-yandex-maps'
import {MapComponent} from './map.component'

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, AngularYandexMapsModule, TuiLoaderModule],
  exports: [MapComponent],
})
export class MapModule {}
