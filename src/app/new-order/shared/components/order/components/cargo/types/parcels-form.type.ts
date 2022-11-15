import {FormArray, FormControl} from '@angular/forms'
import {ParcelFormInterface} from './parcel-form.interface'

export interface ParcelsFormInterface {
  parcels: FormArray<FormControl<ParcelFormInterface>>
}
