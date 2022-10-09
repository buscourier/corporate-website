import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ProfileComponent} from './profile.component'
import {ProfileRoutingModule} from './profile-routing.module'
import {TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, TuiSvgModule],
  providers: [],
})
export class ProfileModule {}
