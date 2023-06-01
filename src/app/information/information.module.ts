import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {InformationRoutingModule} from './information-routing.module'
import {InformationComponent} from './information.component'
import {DocumentsResolver} from '../shared/resolvers/documents.resolver'
import {IndexModule} from './index/index.module'
import {PackagingModule} from './packaging/packaging.module'
import {AirportModule} from './airport/airport.module'
import {HowToGetModule} from './how-to-get/how-to-get.module'
import {HowToSendModule} from './how-to-send/how-to-send.module'
import {RulesModule} from './rules/rules.module'
import {StorageModule} from './storage/storage.module'

@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    InformationRoutingModule,
    TuiSvgModule,
    IndexModule,
    HowToGetModule,
    HowToSendModule,
    RulesModule,
    StorageModule,
    PackagingModule,
    AirportModule,
  ],
  providers: [DocumentsResolver],
})
export class InformationModule {}
