import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {EntityViewComponent} from './entity-view.component'
import {GetEntityProfileEffect} from './store/effects/get-entity-profile.effect'
import {reducer} from './store/reducer'
import {ENTITY_PROFILE_FEATURE} from './store/state'

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
