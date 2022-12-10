import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {MapModule} from '../map/map.module'
import {ModalMapComponent} from './modal-map.component'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [ModalMapComponent],
  imports: [CommonModule, MapModule, TuiSvgModule, TuiButtonModule],
  exports: [ModalMapComponent],
})
export class ModalMapModule {}
