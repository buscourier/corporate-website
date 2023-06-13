import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {NewsComponent} from './news.component'
import {NewsRoutingModule} from './news-routing.module'
import {StoreModule} from '@ngrx/store'
import {NEWS_FEATURE} from './store/state'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {GetNewsEffect} from './store/effects/get-news.effect'
import {NewsService} from '../shared/services/news.service'
import {ImgModule} from '../shared/components/img/img.module'
import {NewsItemModule} from './components/news-item/news-item.module'

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    StoreModule.forFeature(NEWS_FEATURE, reducers),
    EffectsModule.forFeature([GetNewsEffect]),
    ImgModule,
    NewsItemModule,
  ],
  providers: [NewsService],
})
export class NewsModule {}
