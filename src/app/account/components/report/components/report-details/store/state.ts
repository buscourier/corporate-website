import {ReportDetailsStateInterface} from '../types/report-details-state.interface'

export const REPORT_DETAILS_FEATURE = 'reportDetails'

export const initialState: ReportDetailsStateInterface = {
  isLoading: false,
  isSubmitting: false,
  orderCanceled: false,
  backendErrors: null,
  order: null,
}
