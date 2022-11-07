import {CargoInterface} from '../../../types/cargo.interface'

export interface OrderStateInterface {
  cargo: CargoInterface
  packages: []
  services: []
}
