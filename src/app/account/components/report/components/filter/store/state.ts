import {FilterStateInterface} from '../types/filter-state.interface'

export const REPORT_FILTER_FEATURE = 'reportfilter'

export const initialState: FilterStateInterface = {
  isStartCitiesLoading: false,
  isEndCitiesLoading: false,
  startCities: null,
  endCities: null,
  backendErrors: null,
}
