import {EntityProfileInterface} from '../../../types/entity-profile.interface'

export interface EntityProfileStateInterface {
  isProfileLoading: boolean
  backendErrors: string | null
  data: null | EntityProfileInterface
}
