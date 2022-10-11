import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {EntityEditComponent} from './components/entity-edit/entity-edit.component'
import {EntityViewComponent} from './components/entity-view/entity-view.component'

const routes: Routes = [
  {
    path: '',
    component: EntityViewComponent,
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
