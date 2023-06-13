import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDialogContext} from '@taiga-ui/core'
import {ArticleInterface} from '../../../shared/types/article.interface'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {newsByIdSelector} from '../../store/selectors'
import {Router} from '@angular/router'

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsItemComponent implements OnInit {
  article$: Observable<ArticleInterface>

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.article$ = this.store.select(newsByIdSelector(this.articleId))
  }

  get articleId(): string {
    return this.context.data.id
  }

  close() {
    this.context.completeWith(1)
    this.router.navigateByUrl('/news')
  }
}
