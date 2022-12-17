import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ComplexTasksComponent} from './complex-tasks.component'

const routes: Routes = [
  {
    path: '',
    component: ComplexTasksComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplexTasksRoutingModule {}
