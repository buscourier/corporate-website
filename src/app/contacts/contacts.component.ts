import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormControl} from '@angular/forms'

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

  constructor() {}

  setActiveTabIndex(index: number) {
    this.activeTabIndex = index
  }
}
