import {StartCityInterface} from '../../../shared/types/start-city.interface'

export interface TariffsStateInterface {
  isCitiesLoading: boolean
  cities: StartCityInterface[] | null
  backendErrors: string | null
}
