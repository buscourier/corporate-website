import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {HowToGetComponent} from './how-to-get.component'

const routes: Routes = [
  {
    path: '',
    component: HowToGetComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToGetRoutingModule {}
