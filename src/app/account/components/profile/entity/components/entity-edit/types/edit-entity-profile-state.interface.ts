import {EntityProfileInterface} from '../../../types/entity-profile.interface'

export interface EditEntityProfileStateInterface {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: null | string
  data: null | EntityProfileInterface
}
