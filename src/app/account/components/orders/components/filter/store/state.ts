import {FilterStateInterface} from '../types/filter-state.interface'

export const FILTER_FEATURE = 'userOrdersfilter'

export const initialState: FilterStateInterface = {
  isStartCitiesLoading: false,
  isEndCitiesLoading: false,
  startCities: null,
  endCities: null,
  backendErrors: null,
}
