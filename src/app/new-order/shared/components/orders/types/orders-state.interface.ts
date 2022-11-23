import {CargoInterface} from '../../../types/cargo.interface'
import {ServiceInterface} from '../../../types/service.interface'
import {OrderStateInterface} from '../../order/types/order-state.interface'

export interface OrdersStateInterface {
  isAllCargosLoading: boolean
  isAllServicesLoading: boolean
  allCargos: CargoInterface[] | null
  allServices: ServiceInterface[] | null
  isAllCargosLoaded: boolean
  isAllServicesLoaded: boolean
  isValid: boolean
  // isInitialized
  orders: OrderStateInterface[] | null
  activeOrderIndex: number
  backendErrors: string | null
}
