import {globalReducer} from './global/reducer'
import {GLOBAL_FEATURE} from './global/state'
import {GlobalStateInterface} from './global/types/global-state.interface'

export interface State {
  [GLOBAL_FEATURE]: GlobalStateInterface
}

export const reducers = {
  [GLOBAL_FEATURE]: globalReducer,
}
