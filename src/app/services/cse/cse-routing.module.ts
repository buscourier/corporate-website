import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CseComponent} from './cse.component'

const routes: Routes = [
  {
    path: '',
    component: CseComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CseRoutingModule {}
