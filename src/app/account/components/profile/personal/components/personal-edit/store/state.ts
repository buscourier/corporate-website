import {EditPersonalProfileStateInterface} from '../types/edit-personal-profile-state.interface'

export const EDIT_PERSONAL_PROFILE_FEATURE = 'editPersonalProfile'

export const initialState: EditPersonalProfileStateInterface = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  data: null,
}
