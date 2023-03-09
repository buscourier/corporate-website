import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ContactsComponent} from './contacts.component'
import {ContactsResolver} from './services/contacts.resolver'

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    resolve: {
      contacts: ContactsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
