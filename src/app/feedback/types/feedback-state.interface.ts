import {ResponseInterface} from './response.interface'

export interface FeedbackStateInterface {
  isSubmitting: boolean
  response: ResponseInterface | null
  validationErrors: string | null
}
