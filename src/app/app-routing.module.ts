import {NgModule} from '@angular/core'
import {ExtraOptions, RouterModule, Routes} from '@angular/router'
import {AuthGuard} from './auth/services/auth.guard'

const routerOptions: ExtraOptions = {
  scrollOffset: [0, 0],
  scrollPositionRestoration: 'enabled',
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./information/information.module').then(
        (m) => m.InformationModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'new-order',
    loadChildren: () =>
      import('./new-order/new-order.module').then((m) => m.NewOrderModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./contacts/contacts.module').then((m) => m.ContactsModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
