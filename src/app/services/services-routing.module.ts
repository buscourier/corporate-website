import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ServicesComponent} from './services.component'

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
  },
  {
    path: 'cse',
    loadChildren: () => import('./cse/cse.module').then((m) => m.CseModule),
  },
  {
    path: 'complex-tasks',
    loadChildren: () =>
      import('./complex-tasks/complex-tasks.module').then(
        (m) => m.ComplexTasksModule
      ),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
