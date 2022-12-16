import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PackagingComponent} from './packaging.component'

const routes: Routes = [
  {
    path: '',
    component: PackagingComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagingRoutingModule {}
