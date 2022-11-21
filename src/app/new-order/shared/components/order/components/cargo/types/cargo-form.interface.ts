import {FormControl} from '@angular/forms'
import {CargoInterface} from '../../../../../types/cargo.interface'
import {DocFormType} from './doc-form.type'

export interface CargoFormInterface {
  active: FormControl<CargoInterface>
  docs: [{value: DocFormType | null; disabled: boolean}]
  parcels: [{value: any | null; disabled: boolean}]
  auto: [{value: any | null; disabled: boolean}]
  other: [{value: any | null; disabled: boolean}]
  // value: DocFormType | ParcelsFormInterface | DetailsFormInterface
}
