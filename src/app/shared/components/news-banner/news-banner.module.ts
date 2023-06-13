import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewsBannerComponent} from './news-banner.component'
import {TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {NewsService} from '../../services/news.service'
import {StoreModule} from '@ngrx/store'
import {NEWS_BANNER_FEATURE} from './store/state'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {GetNewsEffect} from './store/effects/get-news.effect'
import {TuiLetModule} from '@taiga-ui/cdk'
import {SwiperModule} from 'swiper/angular'

@NgModule({
  declarations: [NewsBannerComponent],
  imports: [
    CommonModule,
    TuiSvgModule,
    StoreModule.forFeature(NEWS_BANNER_FEATURE, reducers),
    EffectsModule.forFeature([GetNewsEffect]),
    TuiLetModule,
    TuiLoaderModule,
    SwiperModule,
  ],
  exports: [NewsBannerComponent],
  providers: [NewsService],
})
export class NewsBannerModule {}
