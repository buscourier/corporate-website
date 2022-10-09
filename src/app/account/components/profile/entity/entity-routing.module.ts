import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {EntityComponent} from './components/entity/entity.component'
import {EntityEditComponent} from './components/entity-edit/entity-edit.component'

const routes: Routes = [
  {
    path: '',
    component: EntityComponent,
  },
  {
    path: 'edit',
    component: EntityEditComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityRoutingModule {}
