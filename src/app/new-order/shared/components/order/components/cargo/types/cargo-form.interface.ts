import {CargoInterface} from '../../../../../types/cargo.interface'
import {DetailsFormInterface} from './details-form.interface'
import {DocFormType} from './doc-form.type'
import {ParcelsFormType} from './parcels-form.type'

export interface CargoFormInterface {
  type: CargoInterface
  value: DocFormType | ParcelsFormType | DetailsFormInterface
}
