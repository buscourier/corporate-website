import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PersonalEditComponent} from './personal-edit.component'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {reducer} from './store/reducer'
import {GetPersonalProfileEffect} from './store/effects/get-personal-profile.effect'
import {ReactiveFormsModule} from '@angular/forms'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit'
import {UpdatePersonalProfileEffect} from './store/effects/update-personal-profile.effect'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [PersonalEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TuiSvgModule,
    TuiLabelModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiButtonModule,
    TuiNotificationModule,
    StoreModule.forFeature('editPersonalProfile', reducer),
    EffectsModule.forFeature([
      GetPersonalProfileEffect,
      UpdatePersonalProfileEffect,
    ]),
    TuiFieldErrorPipeModule,
  ],
  exports: [PersonalEditComponent],
})
export class PersonalEditModule {}
