import {TuiStringHandler} from '@taiga-ui/cdk'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'

export const STRINGIFY_CITIES: TuiStringHandler<
  StartCityInterface | EndCityInterface
> = (item: StartCityInterface | EndCityInterface) =>
  item ? `${item.name}` : ``
