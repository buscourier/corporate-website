import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiLetModule} from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {TuiDataListWrapperModule, TuiSelectModule} from '@taiga-ui/kit'
import {ImgModule} from '../shared/components/img/img.module'
import {MapModule} from '../shared/components/map/map.module'
import {ContactsRoutingModule} from './contacts-routing.module'
import {ContactsComponent} from './contacts.component'

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiLoaderModule,
    TuiScrollbarModule,
    TuiHintModule,
    MapModule,
    ImgModule,
    TuiLetModule,
  ],
})
export class ContactsModule {}
