import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PersonalEditComponent} from './components/personal-edit/personal-edit.component'
import {PersonalComponent} from './components/personal/personal.component'

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent,
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
