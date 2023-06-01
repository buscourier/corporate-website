import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {InformationComponent} from './information.component'
import {IndexComponent} from './index/index.component'
import {PackagingComponent} from './packaging/packaging.component'
import {AirportComponent} from './airport/airport.component'
import {HowToGetComponent} from './how-to-get/how-to-get.component'
import {HowToSendComponent} from './how-to-send/how-to-send.component'
import {RulesComponent} from './rules/rules.component'
import {StorageComponent} from './storage/storage.component'

const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'tariff',
        loadChildren: () =>
          import('./tariff/tariff.module').then((m) => m.TariffModule),
      },
      {
        path: 'packaging',
        component: PackagingComponent,
      },
      {
        path: 'airport',
        component: AirportComponent,
      },
      {
        path: 'how-to-get',
        component: HowToGetComponent,
      },
      {
        path: 'how-to-send',
        component: HowToSendComponent,
      },
      {
        path: 'rules',
        component: RulesComponent,
      },
      {
        path: 'storage',
        component: StorageComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRoutingModule {}
