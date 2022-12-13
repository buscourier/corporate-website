import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiRadioListModule} from '@taiga-ui/kit'
import {CitiesService} from 'src/app/shared/services/cities.service'
import {TariffService} from './services/tariff.service'
import {GetCitiesEffect} from './store/effects/get-cities.effect'
import {GetZoneTariffsEffect} from './store/effects/get-zone-tariffs.effect'
import {GetZonesEffect} from './store/effects/get-zones.effect'
import {reducer} from './store/reducer'
import {TARIFFS_FEATURE} from './store/state'
import {TariffRoutingModule} from './tariff-routing.module'
import {TariffComponent} from './tariff.component'

@NgModule({
  declarations: [TariffComponent],
  imports: [
    CommonModule,
    TariffRoutingModule,
    TuiRadioListModule,
    ReactiveFormsModule,
    StoreModule.forFeature(TARIFFS_FEATURE, reducer),
    EffectsModule.forFeature([
      GetCitiesEffect,
      GetZonesEffect,
      GetZoneTariffsEffect,
    ]),
    TuiLetModule,
  ],
  providers: [CitiesService, TariffService],
})
export class TariffModule {}
