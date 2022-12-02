import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiInputModule} from '@taiga-ui/kit'
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
    ReactiveFormsModule,
    StoreModule.forFeature(CITIES_FEATURE, reducer),
    EffectsModule.forFeature([GetStartCitiesEffect, GetEndCitiesEffect]),
    TuiLoaderModule,
    TuiLetModule,
    TuiScrollbarModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
  ],
})
export class CitiesModule {}
