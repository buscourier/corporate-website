import {AchievementsStateInterface} from '../types/achievements-state.interface'

export const ACHIEVEMENTS_STATE = 'achievements'

export const initialState: AchievementsStateInterface = {
  isLoading: false,
  data: null,
  backendErrors: null,
}
