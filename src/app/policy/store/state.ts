import {PolicyStateInterface} from '../types/policy-state.interface'

export const POLICY_FEATURE = 'policy'

export const initialState: PolicyStateInterface = {
  isMarkupLoading: false,
  isMarkupLoaded: false,
  markup: null,
  backendErrors: null,
}
