import {ResponseInterface} from './response.interface'

export interface TaskFormStateInterface {
  isSubmitting: boolean
  response: ResponseInterface | null
  validationErrors: string | null
}
