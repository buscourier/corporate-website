import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {FormControl} from '@angular/forms'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {take} from 'rxjs'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  activeTabIndex = 1
  isMobile = false
  city = new FormControl('')

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService
  ) {}

  setActiveTabIndex(index: number) {
    this.activeTabIndex = index
  }

  showDetails(data, content: PolymorpheusContent<TuiDialogContext>) {
    this.dialogService
      .open(content, {
        size: 'm',
        closeable: false,
        // dismissible: false,
      })
      .pipe(take(1))
      .subscribe()
  }
}
