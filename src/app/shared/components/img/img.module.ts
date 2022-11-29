import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ImgComponent} from './img.component'

@NgModule({
  declarations: [ImgComponent],
  imports: [CommonModule],
  exports: [ImgComponent],
})
export class ImgModule {}
