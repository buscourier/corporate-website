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
    path: 'services',
    loadChildren: () =>
      import('./services/services.module').then((m) => m.ServicesModule),
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
  },
  {
    path: 'find-order',
    loadChildren: () =>
      import('./find-order/find-order.module').then((m) => m.FindOrderModule),
  },
  {
    path: 'eshops',
    loadChildren: () =>
      import('./shops/shops.module').then((m) => m.ShopsModule),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback/feedback.module').then((m) => m.FeedbackModule),
  },
  {
    path: 'career',
    loadChildren: () =>
      import('./career/career.module').then((m) => m.CareerModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
