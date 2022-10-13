import {OrderDetailsStateInterface} from '../types/order-details-state.interface'

export const ORDER_DETAILS_FEATURE = 'orderDetails'

export const initialState: OrderDetailsStateInterface = {
  isLoading: false,
  isSubmitting: false,
  orderCanceled: false,
  backendErrors: null,
  data: null,
}
