import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {take} from 'rxjs'

@Component({
  selector: 'app-complex-tasks',
  templateUrl: './complex-tasks.component.html',
  styleUrls: ['./complex-tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexTasksComponent {
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService
  ) {}

  openTask(content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogService
      .open(content, {
        size: 'l',
        closeable: false,
        dismissible: false,
      })
      .pipe(take(1))
      .subscribe()
  }
}
