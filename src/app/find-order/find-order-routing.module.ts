import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FindOrderComponent} from './find-order.component'

const routes: Routes = [
  {
    path: '',
    component: FindOrderComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindOrderRoutingModule {}
