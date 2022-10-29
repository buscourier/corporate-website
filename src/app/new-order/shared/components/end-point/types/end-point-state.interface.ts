import {EndCityInterface} from '../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../shared/types/office.interface'

export interface EndPointStateInterface {
  isCitiesLoading: boolean
  isOfficesLoading: boolean
  city: EndCityInterface | null
  get: OfficeInterface | null
  bus: string | null
  activeTab: OfficeInterface | string | null
}
