import {globalReducer} from './global/reducers'
import {GLOBAL_FEATURE} from './global/state'
import {GlobalStateInterface} from './global/types/global-state.interface'
import {documentsReducer} from './documents/reducer'
import {DOCUMENTS_FEATURE, DocumentsStateInterface} from './documents/state'

export interface State {
  [GLOBAL_FEATURE]: GlobalStateInterface
  [DOCUMENTS_FEATURE]: DocumentsStateInterface
}

export const reducers = {
  [GLOBAL_FEATURE]: globalReducer,
  [DOCUMENTS_FEATURE]: documentsReducer,
}
