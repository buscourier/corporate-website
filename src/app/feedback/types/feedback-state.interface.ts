import {ResponseInterface} from './response.interface'

export interface FeedbackStateInterface {
  isSubmitting: boolean
  isPristine: boolean
  response: ResponseInterface | null
  backendErrors: string | null
}
