import {OrderDetailsInterface} from './order-details.interface'

export interface ReportDetailsStateInterface {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: null | string
  orderCanceled: boolean
  order: null | OrderDetailsInterface
}
