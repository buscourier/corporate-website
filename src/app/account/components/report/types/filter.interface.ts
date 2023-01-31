import {TuiDayRange} from '@taiga-ui/cdk'
import {EndCityInterface} from 'src/app/shared/types/end-city.interface'
import {StartCityInterface} from '../../../../shared/types/start-city.interface'

export interface FilterInterface {
  range: TuiDayRange | null
  startCity: StartCityInterface | null
  endCity: EndCityInterface | null
}
