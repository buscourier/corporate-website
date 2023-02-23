import {createSelector} from '@ngrx/store'
import {newOrderFeatureSelector} from '../../../store/selectors'
import {NewOrderStateInterface} from '../../../types/new-order-state.interface'
import {CheckoutStateInterface} from '../types/checkout-state.interface'

export const checkoutFeatureSelector = createSelector(
  newOrderFeatureSelector,
  (state: NewOrderStateInterface) => state.checkout
)

export const currentStepSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.currentStep
)

export const previousStepSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.previousStep
)

export const isCurrentStepValidSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.isCurrentStepValid
)

export const finishedStepsSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.finishedSteps
)

export const newOrderInputSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.orderInput
)

export const newOrderResponseSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state.orderResponse
)

export const createOrderSuccessSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state && state.orderResponse !== null
)

export const createOrderFailureSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => state && state.backendErrors !== null
)

export const isCheckoutValidSelector = createSelector(
  checkoutFeatureSelector,
  (state: CheckoutStateInterface) => {
    return state.isCheckoutValid
  }
)
