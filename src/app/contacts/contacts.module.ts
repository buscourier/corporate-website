import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {TuiDestroyService, TuiLetModule} from '@taiga-ui/cdk'
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
import {ContactsService} from './services/contacts.service'
import {GetOfficesEffect} from './store/effects/get-offices.effect'
import {reducer} from './store/reducer'
import {CONTACTS_FEATURE} from './store/state'

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
    StoreModule.forFeature(CONTACTS_FEATURE, reducer),
    EffectsModule.forFeature([GetOfficesEffect]),
  ],
  providers: [ContactsService],
})
export class ContactsModule {}
