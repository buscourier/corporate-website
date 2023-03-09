import {TariffsStateInterface} from '../types/tariffs-state.interface'

export const TARIFFS_FEATURE = 'tariffs'

export const initialState: TariffsStateInterface = {
  isCitiesLoading: false,
  isCitiesLoaded: false,
  isZonesLoading: false,
  isZoneTariffsLoading: false,
  cities: null,
  zones: null,
  zoneTariffs: null,
  backendErrors: null,
}
