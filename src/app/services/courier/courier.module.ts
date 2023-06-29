import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {CourierRoutingModule} from './courier-routing.module'
import {CourierComponent} from './courier.component'
import {TuiLetModule} from '@taiga-ui/cdk'
import {SiteService} from '../../shared/services/site.service'
import {StoreModule} from '@ngrx/store'
import {COURIER_FEATURE} from './store/state'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {GetServicesEffect} from './store/effects/get-services.effect'

@NgModule({
  declarations: [CourierComponent],
  imports: [
    CommonModule,
    CourierRoutingModule,
    TuiSvgModule,
    TuiLetModule,
    StoreModule.forFeature(COURIER_FEATURE, reducers),
    EffectsModule.forFeature([GetServicesEffect]),
    TuiLoaderModule,
  ],
  providers: [SiteService],
})
export class CourierModule {}
