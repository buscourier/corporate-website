import {FeedbackStateInterface} from '../types/feedback-state.interface'

export const FEEDBACK_FEATURE = 'feedback'

export const initialState: FeedbackStateInterface = {
  isSubmitting: false,
  response: null,
  validationErrors: null,
}
