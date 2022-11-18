import {TuiStringHandler} from '@taiga-ui/cdk'
import {CargoInterface} from '../../new-order/shared/types/cargo.interface'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'

export const STRINGIFY_CITIES: TuiStringHandler<
  StartCityInterface | EndCityInterface
> = (item: StartCityInterface | EndCityInterface) =>
  item ? `${item.name}` : ``

export const STRINGIFY_CARGOS: TuiStringHandler<CargoInterface> = (
  item: CargoInterface
) => (item ? `${item.name}` : ``)
