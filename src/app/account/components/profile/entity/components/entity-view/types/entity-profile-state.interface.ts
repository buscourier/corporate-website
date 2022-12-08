import {ConfidantInterface} from '../../../../../../../shared/types/confidant.interface'
import {EntityProfileInterface} from '../../../types/entity-profile.interface'

export interface EntityProfileStateInterface {
  isProfileLoading: boolean
  isConfidantsLoading: boolean
  backendErrors: string | null
  profile: EntityProfileInterface | null
  confidants: ConfidantInterface[] | null
}
