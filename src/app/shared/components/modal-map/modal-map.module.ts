import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {MapModule} from '../map/map.module'
import {ModalMapComponent} from './modal-map.component'

@NgModule({
  declarations: [ModalMapComponent],
  imports: [CommonModule, MapModule],
  exports: [ModalMapComponent],
})
export class ModalMapModule {}
