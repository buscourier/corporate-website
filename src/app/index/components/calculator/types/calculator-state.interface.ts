import {EndCityInterface} from '../../../../shared/types/end-city.interface'
import {StartCityInterface} from '../../../../shared/types/start-city.interface'

export interface CalculatorStateInterface {
  isStartCitiesLoading: boolean
  isEndCitiesLoading: boolean
  isSubmitting: boolean
  startCities: StartCityInterface[] | null
  endCities: EndCityInterface[] | null
  backendErrors: string | null
}
