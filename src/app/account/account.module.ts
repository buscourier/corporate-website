import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IndexComponent} from './components/index/index.component'
import {AccountRoutingModule} from './account-routing.module'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'
import {ProfileModule} from './components/profile/profile.module'

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
    ProfileModule,
  ],
})
export class AccountModule {}
