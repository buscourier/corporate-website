import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AchievementsComponent} from './achievements.component'
import {StoreModule} from '@ngrx/store'
import {ACHIEVEMENTS_STATE} from './store/state'
import {EffectsModule} from '@ngrx/effects'
import {GetAchievementsEffect} from './store/effects/get-achievements.effect'
import {SiteService} from '../../../shared/services/site.service'
import {TuiLetModule} from '@taiga-ui/cdk'
import {reducers} from './store/reducers'

@NgModule({
  declarations: [AchievementsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(ACHIEVEMENTS_STATE, reducers),
    EffectsModule.forFeature([GetAchievementsEffect]),
    TuiLetModule,
  ],
  exports: [AchievementsComponent],
  providers: [SiteService],
})
export class AchievementsModule {}
