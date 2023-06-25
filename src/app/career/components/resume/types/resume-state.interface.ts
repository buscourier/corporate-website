import {ResponseInterface} from './response.interface'

export interface ResumeStateInterface {
  isSubmitting: boolean
  isPristine: boolean
  response: ResponseInterface | null
  backendErrors: string | null
}
