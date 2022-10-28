import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {TuiSvgModule} from '@taiga-ui/core'
import {ProfileRoutingModule} from './profile-routing.module'
import {ProfileComponent} from './profile.component'

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, TuiSvgModule],
  providers: [],
})
export class ProfileModule {}
