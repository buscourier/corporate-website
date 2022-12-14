import {FindOrderStateInterface} from '../types/find-order-state.interface'

export const FIND_ORDER_FEATURE = 'findOrder'

export const initialState: FindOrderStateInterface = {
  isStatusesLoading: false,
  statuses: null,
  backendErrors: null,
}
