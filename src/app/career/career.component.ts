import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {NewsItemComponent} from '../news/components/news-item/news-item.component'
import {take} from 'rxjs'
import {ResumeComponent} from './components/resume/resume.component'

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerComponent {
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  openResume() {
    this.dialogService
      .open<any>(new PolymorpheusComponent(ResumeComponent, this.injector), {
        dismissible: true,
        closeable: false,
        size: 'l',
      })
      .pipe(take(1))
      .subscribe()
  }
}
