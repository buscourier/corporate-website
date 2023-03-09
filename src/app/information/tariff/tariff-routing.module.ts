import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {TariffComponent} from './tariff.component'
import {TariffResolver} from './services/tariff.resolver'

const routes: Routes = [
  {
    path: '',
    component: TariffComponent,
    resolve: {
      tariff: TariffResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TariffRoutingModule {}
