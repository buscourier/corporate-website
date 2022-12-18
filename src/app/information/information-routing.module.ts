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
      {
        path: 'packaging',
        loadChildren: () =>
          import('./packaging/packaging.module').then((m) => m.PackagingModule),
      },
      {
        path: 'airport',
        loadChildren: () =>
          import('./airport/airport.module').then((m) => m.AirportModule),
      },
      {
        path: 'how-to-get',
        loadChildren: () =>
          import('./how-to-get/how-to-get.module').then(
            (m) => m.HowToGetModule
          ),
      },
      {
        path: 'how-to-send',
        loadChildren: () =>
          import('./how-to-send/how-to-send.module').then(
            (m) => m.HowToSendModule
          ),
      },
      {
        path: 'rules',
        loadChildren: () =>
          import('./rules/rules.module').then((m) => m.RulesModule),
      },
      {
        path: 'storage',
        loadChildren: () =>
          import('./storage/storage.module').then((m) => m.StorageModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRoutingModule {}
