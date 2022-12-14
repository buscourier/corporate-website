import {OrderStatusInterface} from './order-status.interface'

export interface FindOrderStateInterface {
  isStatusesLoading: boolean
  statuses: OrderStatusInterface[] | null
  backendErrors: string | null
}
