import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {InformationComponent} from './information.component'

const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
    children: [
      {
        path: 'tariff',
        loadChildren: () =>
          import('./tariff/tariff.module').then((m) => m.TariffModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRoutingModule {}
