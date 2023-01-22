import {TuiDay} from '@taiga-ui/cdk'
import {OfficeInterface} from '../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../shared/types/start-city.interface'
import {CourierInterface} from '../../../types/courier.interface'

export interface StartPointStateInterface {
  isCitiesLoading: boolean
  isOfficesLoading: boolean
  isCitiesLoaded: boolean
  isValid: boolean
  isPristine: boolean
  cities: StartCityInterface[] | null
  offices: OfficeInterface[] | null
  city: StartCityInterface | null
  give: OfficeInterface | null
  pickup: CourierInterface | null
  date: TuiDay | null
  activeTab: string
}
