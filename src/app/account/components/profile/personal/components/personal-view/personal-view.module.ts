import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiLetModule} from '@taiga-ui/cdk'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {PersonalViewComponent} from './personal-view.component'
import {GetPersonalProfileEffect} from './store/effects/get-personal-profile.effect'
import {reducer} from './store/reducer'

@NgModule({
  declarations: [PersonalViewComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('personalProfile', reducer),
    EffectsModule.forFeature([GetPersonalProfileEffect]),
    TuiButtonModule,
    TuiLoaderModule,
    TuiSvgModule,
    RouterModule,
    TuiLetModule,
  ],
  exports: [PersonalViewComponent],
})
export class PersonalViewModule {}
