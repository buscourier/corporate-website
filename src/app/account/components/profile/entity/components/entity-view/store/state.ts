import {EntityProfileStateInterface} from '../types/entity-profile-state.interface'

export const ENTITY_PROFILE_FEATURE = 'entityProfile'

export const initialState: EntityProfileStateInterface = {
  isProfileLoading: false,
  isProxyLoading: false,
  backendErrors: null,
  profile: null,
  proxy: null,
}
