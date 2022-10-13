import {OrderDetailsInterface} from './order-details.interface'

export interface OrderDetailsStateInterface {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: null | string
  orderCanceled: boolean
  data: null | OrderDetailsInterface
}
