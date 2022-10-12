import {StartCityInterface} from 'src/app/shared/types/start-city.interface'
import {EndCityInterface} from '../../../../../../shared/types/end-city.interface'

export interface FilterStateInterface {
  isStartCitiesLoading: boolean
  isEndCitiesLoading: boolean
  startCities: StartCityInterface[] | null
  endCities: EndCityInterface[] | null
  backendErrors: string | null
}
