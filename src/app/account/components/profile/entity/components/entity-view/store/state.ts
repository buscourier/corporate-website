import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'

export const ENTITY_PROFILE_FEATURE = 'entityProfile'

export const initialState: EntityProfileStateInterface = {
  isProfileLoading: false,
  isConfidantsLoading: false,
  backendErrors: null,
  profile: null,
  confidants: null,
}
