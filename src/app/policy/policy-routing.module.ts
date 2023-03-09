import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PolicyComponent} from './policy.component'
import {PolicyResolver} from './policy.resolver'

const routes: Routes = [
  {
    path: '',
    component: PolicyComponent,
    resolve: {
      policy: PolicyResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
