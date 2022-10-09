import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {IndexComponent} from './components/index/index.component'
import {ProfileComponent} from './components/profile/profile.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
