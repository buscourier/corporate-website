import {ReportStateInterface} from '../types/report-state.interface'

export const REPORT_FEATURE = 'report'

export const initialState: ReportStateInterface = {
  isLoading: false,
  backendErrors: null,
  orders: null,
}
