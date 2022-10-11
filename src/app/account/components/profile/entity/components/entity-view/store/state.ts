import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'

export const ENTITY_PROFILE_FEATURE = 'entityProfile'

export const initialState: EntityProfileStateInterface = {
  isLoading: false,
  backendErrors: null,
  data: null,
}
