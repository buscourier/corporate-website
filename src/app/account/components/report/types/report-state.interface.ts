import {OrderDetailsInterface} from './order-details.interface'
import {ReportResponseInterface} from './report-response.interface'

export interface ReportStateInterface {
  isLoading: boolean
  isOrderDetailsLoading: boolean
  backendErrors: string | null
  orders: ReportResponseInterface | null
  orderDetails: OrderDetailsInterface | null
}
