import {TuiStringHandler} from '@taiga-ui/cdk'
import {CargoInterface} from '../../new-order/shared/types/cargo.interface'
import {ConfidantInterface} from '../types/confidant.interface'
import {DocTypeInterface} from '../types/doc-type.interface'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'

export const STRINGIFY_CITIES: TuiStringHandler<
  StartCityInterface | EndCityInterface
> = (item: StartCityInterface | EndCityInterface) =>
  item ? `${item.name}` : ``

export const STRINGIFY_CARGOS: TuiStringHandler<CargoInterface> = (
  item: CargoInterface
) => (item ? `${item.name}` : ``)

export const STRINGIFY_DOCTYPE: TuiStringHandler<DocTypeInterface> = (
  item: DocTypeInterface
) => (item ? `${item.name}` : ``)

export const STRINGIFY_CONFIDANT: TuiStringHandler<ConfidantInterface> = (
  item: ConfidantInterface
) => (item ? `${item.name}` : ``)
