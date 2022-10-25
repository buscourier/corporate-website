import {EndCityInterface} from 'src/app/shared/types/end-city.interface'
import {StartCityInterface} from '../../../../shared/types/start-city.interface'

export interface FilterInterface {
  range?: [string, string]
  startCity: StartCityInterface | null
  endCity: EndCityInterface | null
}
