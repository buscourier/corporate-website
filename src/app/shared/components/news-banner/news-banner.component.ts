import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {BackendErrorsInterface} from '../../types/backend-errors.interface'
import {NewsItemInterface} from '../../types/news-item.interface'
import {Store} from '@ngrx/store'
import {getNewsAction} from './store/actions/get-news.action'
import {
  allNewsSelector,
  backendErrorsSelector,
  isLoadingSelector,
} from './store/selectors'
import {SwiperOptions} from 'swiper'
import {tap} from 'rxjs/operators'
import SwiperCore, {Autoplay} from 'swiper'

SwiperCore.use([Autoplay])

@Component({
  selector: 'app-news-banner',
  templateUrl: './news-banner.component.html',
  styleUrls: ['./news-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsBannerComponent implements OnInit {
  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface>
  news$: Observable<NewsItemInterface[]>

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
    },
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initValues()
    this.fetchData()
  }

  private initValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.news$ = this.store.select(allNewsSelector)
  }

  private fetchData(): void {
    this.store.dispatch(getNewsAction())
  }
}
