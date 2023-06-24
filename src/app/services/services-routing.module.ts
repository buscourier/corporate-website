import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ServicesComponent} from './services.component'
import {IndexComponent} from './index/index.component'
import {ComplexTasksComponent} from './complex-tasks/complex-tasks.component'
import {InsuranceComponent} from './insurance/insurance.component'
import {CourierComponent} from './courier/courier.component'
import {CseComponent} from './cse/cse.component'

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'complex-tasks',
        component: ComplexTasksComponent,
      },
      {
        path: 'insurance',
        component: InsuranceComponent,
      },
      {
        path: 'courier',
        component: CourierComponent,
      },
      {
        path: 'cse',
        component: CseComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
