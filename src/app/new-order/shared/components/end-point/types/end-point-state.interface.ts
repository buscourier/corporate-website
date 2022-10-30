import {EndCityInterface} from '../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../shared/types/office.interface'

export interface EndPointStateInterface {
  isCitiesLoading: boolean
  isOfficesLoading: boolean
  cities: EndCityInterface[]
  offices: OfficeInterface[]
  city: EndCityInterface | null
  get: OfficeInterface | null
  isBus: boolean
  activeTab: OfficeInterface | string | null
}
