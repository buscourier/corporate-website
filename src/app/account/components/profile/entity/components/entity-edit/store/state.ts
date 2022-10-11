import {EditEntityProfileStateInterface} from '../types/edit-entity-profile-state.interface'

export const EDIT_ENTITY_PROFILE_FEATURE = 'editEntityProfile'

export const initialState: EditEntityProfileStateInterface = {
  isLoading: false,
  isSubmitting: false,
  backendErrors: null,
  data: null,
}
