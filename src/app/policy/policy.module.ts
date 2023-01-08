import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {PolicyRoutingModule} from './policy-routing.module'
import {PolicyComponent} from './policy.component'
import {TuiLoaderModule} from '@taiga-ui/core'
import {TuiLetModule} from '@taiga-ui/cdk'
import {StoreModule} from '@ngrx/store'
import {POLICY_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {EffectsModule} from '@ngrx/effects'
import {GetMarkupEffect} from './store/effects/get-data.effect'
import {SiteService} from '../shared/services/site.service'

@NgModule({
  declarations: [PolicyComponent],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    TuiLoaderModule,
    TuiLetModule,
    StoreModule.forFeature(POLICY_FEATURE, reducer),
    EffectsModule.forFeature([GetMarkupEffect]),
  ],
  providers: [SiteService],
})
export class PolicyModule {}
