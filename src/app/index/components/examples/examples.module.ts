import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiMoneyModule} from '@taiga-ui/addon-commerce'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {
  TuiCarouselModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiPaginationModule,
} from '@taiga-ui/kit'
import {ExamplesComponent} from './examples.component'
import {ImgModule} from '../../../shared/components/img/img.module'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [ExamplesComponent],
  imports: [
    CommonModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiMoneyModule,
    TuiLoaderModule,
    TuiMarkerIconModule,
    TuiButtonModule,
    TuiSvgModule,
    ImgModule,
    RouterModule,
    TuiPaginationModule,
  ],
  exports: [ExamplesComponent],
})
export class ExamplesModule {}
