import {EntityEditComponent} from './components/entity-edit/entity-edit.component'
import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {EntityComponent} from './components/entity/entity.component'
import {AuthGuard} from '../../../../auth/services/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: EntityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: EntityEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityRoutingModule {}
