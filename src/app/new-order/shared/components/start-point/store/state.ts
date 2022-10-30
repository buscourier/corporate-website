import {StartPointStateInterface} from '../types/start-point-state.interface'

export const START_POINT_FEATURE = 'startPoint'

export const initialState: StartPointStateInterface = {
  isCitiesLoading: false,
  isOfficesLoading: false,
  cities: null,
  offices: null,
  city: null,
  give: null,
  pickup: null,
  date: null,
  activeTab: null,
}
