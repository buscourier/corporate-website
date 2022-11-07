import {EndCityInterface} from '../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../shared/types/office.interface'

export interface EndPointStateInterface {
  isCitiesLoading: boolean
  isOfficesLoading: boolean
  isCitiesLoaded: boolean
  cities: EndCityInterface[] | null
  offices: OfficeInterface[] | null
  city: EndCityInterface | null
  get: OfficeInterface | null
  isBus: boolean
  activeTabIndex: number
}
