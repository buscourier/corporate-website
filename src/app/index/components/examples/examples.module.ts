import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiMoneyModule} from '@taiga-ui/addon-commerce'
import {TuiLoaderModule} from '@taiga-ui/core'
import {
  TuiCarouselModule,
  TuiIslandModule,
  TuiMarkerIconModule,
} from '@taiga-ui/kit'
import {ExamplesComponent} from './examples.component'

@NgModule({
  declarations: [ExamplesComponent],
  imports: [
    CommonModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiMoneyModule,
    TuiLoaderModule,
    TuiMarkerIconModule,
  ],
  exports: [ExamplesComponent],
})
export class ExamplesModule {}
