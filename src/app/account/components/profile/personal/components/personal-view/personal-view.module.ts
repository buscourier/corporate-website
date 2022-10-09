import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PersonalViewComponent} from './personal-view.component'

@NgModule({
  declarations: [PersonalViewComponent],
  imports: [CommonModule],
  exports: [PersonalViewComponent],
})
export class PersonalViewModule {}
