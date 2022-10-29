import {EndPointStateInterface} from '../types/end-point-state.interface'

export const END_POINT_FEATURE = 'endPoint'

export const initialState: EndPointStateInterface = {
  isCitiesLoading: false,
  isOfficesLoading: false,
  city: null,
  get: null,
  bus: null,
  activeTab: null,
}
