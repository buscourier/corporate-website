import {FeedbackStateInterface} from '../types/feedback-state.interface'

export const FEEDBACK_FEATURE = 'feedback'

export const initialState: FeedbackStateInterface = {
  isSubmitting: false,
  isPristine: true,
  response: null,
  backendErrors: null,
}
