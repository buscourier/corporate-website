import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PersonalEditComponent} from './components/personal-edit/personal-edit.component'
import {PersonalViewComponent} from './components/personal-view/personal-view.component'

const routes: Routes = [
  {
    path: '',
    component: PersonalViewComponent,
  },
  {
    path: 'edit',
    component: PersonalEditComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalRoutingModule {}
