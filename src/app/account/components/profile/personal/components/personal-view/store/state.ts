import {PersonalProfileStateInterface} from '../types/personal-profile-state.interface'

export const PERSONAL_PROFILE_FEATURE = 'personal-profile'

export const initialState: PersonalProfileStateInterface = {
  isLoading: false,
  backendErrors: null,
  data: null,
}
