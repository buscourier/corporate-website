import {EndCityInterface} from '../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../shared/types/office.interface'
import {CourierInterface} from '../../../types/courier.interface'

export interface EndPointStateInterface {
  isCitiesLoading: boolean
  isOfficesLoading: boolean
  isCitiesLoaded: boolean
  isValid: boolean
  cities: EndCityInterface[] | null
  offices: OfficeInterface[] | null
  city: EndCityInterface | null
  get: OfficeInterface | null
  delivery: CourierInterface
  needToMeet: boolean
  activeTabIndex: number
}
