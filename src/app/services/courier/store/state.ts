import {CourierStateInterface} from '../types/courier-state.interface'

export const COURIER_FEATURE = 'courier'

export const initialState: CourierStateInterface = {
  isServicesLoading: false,
  services: null,
  backendErrors: null,
}
