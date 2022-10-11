import {EntityProfileInterface} from '../../../types/entity-profile.interface'

export interface EntityProfileStateInterface {
  isLoading: boolean
  backendErrors: string | null
  data: null | EntityProfileInterface
}
