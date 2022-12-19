import {OrderInterface} from './order.interface'

export interface ReportResponseInterface {
  rows: string
  orders: OrderInterface[]
}
