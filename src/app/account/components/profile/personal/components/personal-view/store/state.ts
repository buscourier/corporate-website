import {PersonalProfileStateInterface} from '../types/personal-profile-state.interface'

export const PERSONAL_PROFILE_FEATURE = 'personalProfile'

export const initialState: PersonalProfileStateInterface = {
  isLoading: false,
  backendErrors: null,
  data: null,
}
