import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiButtonModule} from '@taiga-ui/core'
import {PersonalEditModule} from './components/personal-edit/personal-edit.module'
import {PersonalViewModule} from './components/personal-view/personal-view.module'
import {PersonalRoutingModule} from './personal-routing.module'
import {PersonalService} from './services/personal.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    TuiButtonModule,
    PersonalViewModule,
    PersonalEditModule,
  ],
  providers: [PersonalService],
})
export class PersonalModule {}
