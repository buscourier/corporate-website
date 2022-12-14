import {PickupPointsStateInterface} from '../types/pickup-points-state.interface'

export const PICKUP_POINTS_FEATURE = 'pickupPoints'

export const initialState: PickupPointsStateInterface = {
  isDepartmentsLoading: false,
  departments: null,
  backendErrors: null,
}
