import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ContactsRoutingModule} from './contacts-routing.module'
import {ContactsComponent} from './contacts.component'

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, ContactsRoutingModule],
})
export class ContactsModule {}
