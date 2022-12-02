import {CitiesStateInterface} from '../types/cities-state.interface'

export const CITIES_FEATURE = 'indexCitiesForm'

export const initialState: CitiesStateInterface = {
  isStartCitiesLoading: false,
  isEndCitiesLoading: false,
  startCities: null,
  endCities: null,
  backendErrors: null,
}
