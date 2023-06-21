import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDialogContext} from '@taiga-ui/core'
import {NewsItemInterface} from '../../../shared/types/news-item.interface'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {
  currentItemSelector,
  isCurrentItemLoadingSelector,
} from '../../store/selectors'
import {Router} from '@angular/router'
import {getNewsItemAction} from '../../store/actions/get-news-item.action'
import {tap} from 'rxjs/operators'
import {clearNewsItemAction} from '../../store/actions/clear-news-item.action'

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsItemComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>
  data$: Observable<NewsItemInterface>

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(isCurrentItemLoadingSelector)
    this.data$ = this.store.select(currentItemSelector).pipe(
      tap((data: NewsItemInterface) => {
        console.log('data', data)
      })
    )
    this.store.dispatch(getNewsItemAction({id: this.id}))
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearNewsItemAction())
  }

  get id(): string {
    return this.context.data.id
  }

  close() {
    this.context.completeWith(1)
    this.router.navigateByUrl('/news')
  }
}
