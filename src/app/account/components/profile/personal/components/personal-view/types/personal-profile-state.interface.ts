import {PersonalProfileInterface} from '../../../types/personal-profile.interface'

export interface PersonalProfileStateInterface {
  isLoading: boolean
  backendErrors: string | null
  data: null | PersonalProfileInterface
}
