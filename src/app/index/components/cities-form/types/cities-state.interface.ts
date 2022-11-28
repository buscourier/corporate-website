import {EndCityInterface} from '../../../../shared/types/end-city.interface'
import {StartCityInterface} from '../../../../shared/types/start-city.interface'

export interface CitiesStateInterface {
  isStartCitiesLoading: boolean
  isEndCitiesLoading: boolean
  startCities: StartCityInterface[] | null
  endCities: EndCityInterface[] | null
  backendErrors: string | null
}
