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
import {SiteService} from '../shared/services/site.service'
import {GetNewsItemEffect} from './store/effects/get-news-item.effect'

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    StoreModule.forFeature(NEWS_FEATURE, reducers),
    EffectsModule.forFeature([GetNewsEffect, GetNewsItemEffect]),
    ImgModule,
    NewsItemModule,
  ],
  providers: [SiteService],
})
export class NewsModule {}
