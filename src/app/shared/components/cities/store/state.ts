import {CitiesStateInterface} from '../types/cities-state.interface'

export const CITIES_FEATURE = 'citiesModal'

export const initialState: CitiesStateInterface = {
  isLoading: false,
  startCities: null,
  endCities: null,
  backendErrors: null,
}
