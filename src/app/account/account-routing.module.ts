import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AccountComponent} from './account.component'

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    // canActivate: [EntityGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./components/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./components/report/report.module').then((m) => m.ReportModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
