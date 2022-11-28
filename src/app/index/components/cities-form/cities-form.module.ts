import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiDataListWrapperModule, TuiSelectModule} from '@taiga-ui/kit'
import {CitiesService} from '../../../shared/services/cities.service'
import {CitiesFormComponent} from './cities-form.component'
import {GetEndCitiesEffect} from './store/effects/get-end-cities.effect'
import {GetStartCitiesEffect} from './store/effects/get-start-cities.effect'
import {reducer} from './store/reducer'
import {CITIES_FEATURE} from './store/state'

@NgModule({
  declarations: [CitiesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiLoaderModule,
    TuiSelectModule,
    StoreModule.forFeature(CITIES_FEATURE, reducer),
    EffectsModule.forFeature([GetStartCitiesEffect, GetEndCitiesEffect]),
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiLetModule,
    TuiButtonModule,
  ],
  exports: [CitiesFormComponent],
  providers: [CitiesService],
})
export class CitiesFormModule {}
