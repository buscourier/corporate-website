import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PersonalRoutingModule} from './personal-routing.module'
import {TuiButtonModule} from '@taiga-ui/core'
import {PersonalService} from './services/personal.service'
import {PersonalViewModule} from './components/personal-view/personal-view.module'
import {PersonalEditModule} from './components/personal-edit/personal-edit.module'

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
