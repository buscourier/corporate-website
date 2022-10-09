import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {EntityComponent} from './entity/components/entity/entity.component'
import {ProfileComponent} from './profile.component'
import {PersonalComponent} from './personal/components/personal/personal.component'
import {EntityEditComponent} from './entity/components/entity-edit/entity-edit.component'
import {PersonalEditComponent} from './personal/components/personal-edit/personal-edit.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'entity',
        loadChildren: () =>
          import('./entity/entity.module').then((m) => m.EntityModule),
      },
      {
        path: 'personal',
        loadChildren: () =>
          import('./personal/personal.module').then((m) => m.PersonalModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
