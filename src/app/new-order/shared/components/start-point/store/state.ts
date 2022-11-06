import {TuiDay} from '@taiga-ui/cdk'
import {StartPointStateInterface} from '../types/start-point-state.interface'

export const START_POINT_FEATURE = 'startPoint'

const setCurrentDate = () => {
  const date = new Date()
  return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate())
}

export const initialState: StartPointStateInterface = {
  isCitiesLoading: false,
  isOfficesLoading: false,
  isCitiesLoaded: false,
  cities: null,
  offices: null,
  city: null,
  give: null,
  pickup: null,
  date: setCurrentDate(),
  activeTabIndex: 0,
}
