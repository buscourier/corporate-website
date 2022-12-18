import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {StorageRoutingModule} from './storage-routing.module'
import {StorageComponent} from './storage.component'

@NgModule({
  declarations: [StorageComponent],
  imports: [CommonModule, StorageRoutingModule],
})
export class StorageModule {}
