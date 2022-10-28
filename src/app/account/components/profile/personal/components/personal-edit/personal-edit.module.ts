import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit'
import {PersonalEditComponent} from './personal-edit.component'
import {GetPersonalProfileEffect} from './store/effects/get-personal-profile.effect'
import {UpdatePersonalProfileEffect} from './store/effects/update-personal-profile.effect'
import {reducer} from './store/reducer'

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
