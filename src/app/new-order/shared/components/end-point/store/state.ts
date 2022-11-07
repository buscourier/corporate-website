import {EndPointStateInterface} from '../types/end-point-state.interface'

export const END_POINT_FEATURE = 'endPoint'

export const initialState: EndPointStateInterface = {
  isCitiesLoading: false,
  isOfficesLoading: false,
  isCitiesLoaded: false,
  cities: null,
  offices: null,
  city: null,
  get: null,
  isBus: false,
  activeTabIndex: 0,
}
