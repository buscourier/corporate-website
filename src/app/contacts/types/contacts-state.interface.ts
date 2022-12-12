import {OfficeInterface} from '../../shared/types/office.interface'

export interface ContactsStateInterface {
  isOfficesLoading: boolean
  offices: OfficeInterface[] | null
  backendErrors: string | null
}
