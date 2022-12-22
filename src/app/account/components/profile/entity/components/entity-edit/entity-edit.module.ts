import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit'
import {AlertModule} from '../../../../../../shared/components/alert/alert.module'
import {EntityEditComponent} from './entity-edit.component'
import {GetEntityProfileEffect} from './store/effects/get-entity-profile.effect'
import {UpdateEntityProfileEffect} from './store/effects/update-entity-profile.effect'
import {reducer} from './store/reducer'
import {EDIT_ENTITY_PROFILE_FEATURE} from './store/state'

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
    AlertModule,
    TuiLoaderModule,
    StoreModule.forFeature(EDIT_ENTITY_PROFILE_FEATURE, reducer),
    EffectsModule.forFeature([
      GetEntityProfileEffect,
      UpdateEntityProfileEffect,
    ]),
    TuiFieldErrorPipeModule,
    TuiLetModule,
  ],
  exports: [EntityEditComponent],
})
export class EntityEditModule {}
