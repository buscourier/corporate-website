import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EntityRoutingModule} from './entity-routing.module'
import {EntityEditModule} from './components/entity-edit/entity-edit.module'
import {EntityViewModule} from './components/entity-view/entity-view.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntityRoutingModule,
    EntityViewModule,
    EntityEditModule,
  ],
})
export class EntityModule {}
