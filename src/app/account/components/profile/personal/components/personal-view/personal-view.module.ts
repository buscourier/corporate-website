import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PersonalViewComponent} from './personal-view.component'
import {HttpClientModule} from '@angular/common/http'
import {StoreModule} from '@ngrx/store'
import {reducer} from './store/reducer'
import {EffectsModule} from '@ngrx/effects'
import {GetPersonalProfileEffect} from './store/effects/get-personal-profile.effect'

@NgModule({
  declarations: [PersonalViewComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('personalProfile', reducer),
    EffectsModule.forFeature([GetPersonalProfileEffect]),
  ],
  exports: [PersonalViewComponent],
})
export class PersonalViewModule {}
