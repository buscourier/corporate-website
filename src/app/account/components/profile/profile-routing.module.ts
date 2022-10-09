import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ProfileComponent} from './profile.component'

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
