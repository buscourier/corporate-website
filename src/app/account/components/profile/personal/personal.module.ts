import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PersonalComponent} from './components/personal/personal.component'
import {PersonalEditComponent} from './components/personal-edit/personal-edit.component'
import {PersonalRoutingModule} from './personal-routing.module'

@NgModule({
  declarations: [PersonalComponent, PersonalEditComponent],
  imports: [CommonModule, PersonalRoutingModule],
})
export class PersonalModule {}
