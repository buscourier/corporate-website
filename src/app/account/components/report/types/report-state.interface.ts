import {ReportResponseInterface} from './report-response.interface'

export interface ReportStateInterface {
  isLoading: boolean
  backendErrors: string | null
  orders: ReportResponseInterface
}
