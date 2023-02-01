import {ResponseInterface} from './response.interface'

export interface TaskFormStateInterface {
  isSubmitting: boolean
  response: ResponseInterface | null
  backendErrors: string | null
}
