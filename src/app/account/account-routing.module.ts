import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {IndexComponent} from './index.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
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
