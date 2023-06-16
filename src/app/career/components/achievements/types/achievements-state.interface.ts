import {BackendErrorsInterface} from '../../../../shared/types/backend-errors.interface'
import {AchievementsInterface} from './achievements.interface'

export interface AchievementsStateInterface {
  isLoading: boolean
  data: AchievementsInterface | null
  backendErrors: BackendErrorsInterface | null
}
