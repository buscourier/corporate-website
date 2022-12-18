import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {HowToSendComponent} from './how-to-send.component'

const routes: Routes = [
  {
    path: '',
    component: HowToSendComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToSendRoutingModule {}
