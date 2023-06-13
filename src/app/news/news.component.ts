import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core'
import {tap} from 'rxjs/operators'
import {ArticleInterface} from '../shared/types/article.interface'
import {Store} from '@ngrx/store'
import {BackendErrorsInterface} from '../shared/types/backend-errors.interface'
import {filter, map, Observable, take} from 'rxjs'
import {
  allNewsSelector,
  backendErrorsSelector,
  isLoadingSelector,
} from './store/selectors'
import {getNewsAction} from './store/actions/get-news.action'
import {
  PolymorpheusComponent,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {NewsItemComponent} from './components/news-item/news-item.component'
import {ActivatedRoute, ParamMap} from '@angular/router'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {
  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface>
  news$: Observable<ArticleInterface[]>

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initValues()
    this.fetchData()
  }

  private initValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.news$ = this.store.select(allNewsSelector)

    this.listenOpenArticleByQueryParams()
  }

  private fetchData(): void {
    this.store.dispatch(getNewsAction())
  }

  private listenOpenArticleByQueryParams(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        map((queryParamMap: ParamMap) => queryParamMap.get('id')),
        filter(Boolean)
      )
      .subscribe((id: string) => {
        console.log('id', id)
        this.openArticle(id)
      })
  }

  openArticle(id: string) {
    this.dialogService
      .open<any>(new PolymorpheusComponent(NewsItemComponent, this.injector), {
        data: {
          id,
        },
        dismissible: true,
        closeable: false,
        size: 'l',
      })
      .pipe(take(1))
      .subscribe()
  }
}
