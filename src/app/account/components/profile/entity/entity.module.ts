import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EntityComponent} from './components/entity/entity.component'
import {EntityEditComponent} from './components/entity-edit/entity-edit.component'
import {EntityRoutingModule} from './entity-routing.module'

@NgModule({
  declarations: [EntityComponent, EntityEditComponent],
  imports: [CommonModule, EntityRoutingModule],
})
export class EntityModule {}
