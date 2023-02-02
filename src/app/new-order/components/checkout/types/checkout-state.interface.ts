import {NewOrderInputInterface} from './new-order-input.interface'
import {NewOrderResponseInterface} from './new-order-response.interface'
import {HttpErrorResponse} from '@angular/common/http'

export interface CheckoutStateInterface {
  currentStep: number
  previousStep: number
  isCurrentStepValid: boolean
  finishedSteps: {
    [key: number]: boolean
  }
  validSteps: {
    [key: number]: boolean
  }
  isCheckoutValid: boolean
  isSubmitting: boolean
  orderInput: NewOrderInputInterface
  orderResponse: NewOrderResponseInterface
  backendErrors: HttpErrorResponse
}
