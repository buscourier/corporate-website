import {OrdersStateInterface} from '../types/orders-state.interface'

export const ORDERS_FEATURE = 'userOrders'

export const initialState: OrdersStateInterface = {
  isLoading: false,
  backendErrors: null,
  data: null,
}
