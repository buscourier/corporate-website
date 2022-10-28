import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {MobileDataComponent} from './components/mobile-data/mobile-data.component'

@NgModule({
  declarations: [MobileDataComponent],
  imports: [CommonModule],
  exports: [MobileDataComponent],
})
export class MobileDataModule {}
