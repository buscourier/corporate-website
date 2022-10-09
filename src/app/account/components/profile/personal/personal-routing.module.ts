import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {AuthGuard} from '../../../../auth/services/auth.guard'
import {PersonalEditComponent} from './components/personal-edit/personal-edit.component'
import {PersonalComponent} from './components/personal/personal.component'

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: PersonalEditComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityRoutingModule {}
