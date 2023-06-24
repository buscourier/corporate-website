import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  BehaviorSubject,
  filter,
  interval,
  map,
  mergeWith,
  Observable,
} from 'rxjs'
import {BackendErrorsInterface} from '../../types/backend-errors.interface'
import {NewsItemInterface} from '../../types/news-item.interface'
import {Store} from '@ngrx/store'
import {getNewsAction} from './store/actions/get-news.action'
import {
  allNewsSelector,
  backendErrorsSelector,
  isLoadingSelector,
} from './store/selectors'
import Swiper, {SwiperOptions, Virtual} from 'swiper'
import SwiperCore, {Autoplay} from 'swiper'
import {tap} from 'rxjs/operators'

SwiperCore.use([Autoplay, Virtual])

@Component({
  selector: 'app-news-banner',
  templateUrl: './news-banner.component.html',
  styleUrls: ['./news-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsBannerComponent implements OnInit {
  @ViewChild('swiperRef', {static: true})
  protected _swiperRef: ElementRef | undefined
  swiper?: Swiper

  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface>
  news$: Observable<NewsItemInterface[]>

  activeSlideIndex$ = new BehaviorSubject<number>(0)

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 100000,
    },
  }

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initValues()
    this.fetchData()
  }

  private initValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.news$ = this.store.select(allNewsSelector)
    // .pipe(
    //   map((arr) => {
    //     return [arr[0]]
    //   })
    // )
  }

  private fetchData(): void {
    this.store.dispatch(getNewsAction())
  }

  onSlideChange(slider: [swiper: Swiper]) {
    this.activeSlideIndex$.next(slider[0].activeIndex)
    this.cdr.detectChanges()
  }
}
