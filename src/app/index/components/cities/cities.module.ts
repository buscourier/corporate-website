import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiLoaderModule, TuiScrollbarModule} from '@taiga-ui/core'
import {CitiesComponent} from './cities.component'
import {CitiesBlockComponent} from './components/cities-block/cities-block.component'
import {GetEndCitiesEffect} from './store/effects/get-end-cities.effect'
import {GetStartCitiesEffect} from './store/effects/get-start-cities.effect'
import {reducer} from './store/reducer'
import {CITIES_FEATURE} from './store/state'

@NgModule({
  declarations: [CitiesComponent, CitiesBlockComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(CITIES_FEATURE, reducer),
    EffectsModule.forFeature([GetStartCitiesEffect, GetEndCitiesEffect]),
    TuiLoaderModule,
    TuiLetModule,
    TuiScrollbarModule,
  ],
})
export class CitiesModule {}
