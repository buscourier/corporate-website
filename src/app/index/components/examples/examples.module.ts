import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiCarouselModule} from '@taiga-ui/kit'
import {ExamplesComponent} from './examples.component'

@NgModule({
  declarations: [ExamplesComponent],
  imports: [CommonModule, TuiCarouselModule],
  exports: [ExamplesComponent],
})
export class ExamplesModule {}
