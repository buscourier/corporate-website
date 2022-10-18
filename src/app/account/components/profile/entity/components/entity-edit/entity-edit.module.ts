import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EntityEditComponent} from './entity-edit.component'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {EDIT_ENTITY_PROFILE_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {GetEntityProfileEffect} from './store/effects/get-entity-profile.effect'
import {ReactiveFormsModule} from '@angular/forms'
import {UpdatePersonalProfileEffect} from './store/effects/update-entity-profile.effect'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [EntityEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TuiLabelModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiNotificationModule,
    TuiLoaderModule,
    StoreModule.forFeature(EDIT_ENTITY_PROFILE_FEATURE, reducer),
    EffectsModule.forFeature([
      GetEntityProfileEffect,
      UpdatePersonalProfileEffect,
    ]),
    TuiFieldErrorPipeModule,
  ],
  exports: [EntityEditComponent],
})
export class EntityEditModule {}
