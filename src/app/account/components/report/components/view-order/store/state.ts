import {ViewOrderStateInterface} from '../types/view-order-state.interface'

export const VIEW_ORDER_FEATURE = 'viewOrder'

export const initialState: ViewOrderStateInterface = {
  isSubmitting: false,
  backendErrors: null,
}
