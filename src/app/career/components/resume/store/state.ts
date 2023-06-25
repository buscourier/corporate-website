import {ResumeStateInterface} from '../types/resume-state.interface'

export const RESUME_FEATURE = 'resume'

export const initialState: ResumeStateInterface = {
  isSubmitting: false,
  isPristine: true,
  response: null,
  backendErrors: null,
}
