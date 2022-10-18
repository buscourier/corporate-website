import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EntityViewComponent} from './entity-view.component'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {ENTITY_PROFILE_FEATURE} from './store/state'
import {reducer} from './store/reducer'
import {GetEntityProfileEffect} from './store/effects/get-entity-profile.effect'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [EntityViewComponent],
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiSvgModule,
    RouterModule,
    StoreModule.forFeature(ENTITY_PROFILE_FEATURE, reducer),
    EffectsModule.forFeature([GetEntityProfileEffect]),
  ],
  exports: [EntityViewComponent],
})
export class EntityViewModule {}
