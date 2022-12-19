import {EndCityInterface} from '../../../types/end-city.interface'
import {StartCityInterface} from '../../../types/start-city.interface'

export interface CitiesStateInterface {
  isLoading: boolean
  startCities: StartCityInterface[] | null
  endCities: EndCityInterface[] | null
  backendErrors: string | null
}
