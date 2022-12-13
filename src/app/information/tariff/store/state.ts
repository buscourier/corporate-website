import {TariffsStateInterface} from '../types/tariffs-state.interface'

export const TARIFFS_FEATURE = 'tariffs'

export const initialState: TariffsStateInterface = {
  isCitiesLoading: false,
  cities: null,
  backendErrors: null,
}
