import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PersonalEditComponent} from './personal-edit.component'

@NgModule({
  declarations: [PersonalEditComponent],
  imports: [CommonModule],
  exports: [PersonalEditComponent],
})
export class PersonalEditModule {}
