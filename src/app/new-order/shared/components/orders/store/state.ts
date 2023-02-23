import {OrdersStateInterface} from '../types/orders-state.interface'

export const ORDERS_FEATURE = 'orders'

export const initialState: OrdersStateInterface = {
  isAllCargosLoading: false,
  isAllServicesLoading: false,
  isAllCargosLoaded: false,
  isAllServicesLoaded: false,
  isValid: false,
  isPristine: true,
  // isInitialized: false,
  allCargos: null,
  allServices: null,
  orders: null,
  activeOrderIndex: 0,
  backendErrors: null,
}
