import {Action, createReducer, on} from '@ngrx/store'
import {CheckoutStateInterface} from '../types/checkout-state.interface'
import {setCurrentStepAction} from './actions/set-current-step.action'
import {setInvalidStateAction} from './actions/set-invalid-state.action'
import {initialState} from './state'

const checkoutReducer = createReducer(
  initialState,
  on(setCurrentStepAction, (state: CheckoutStateInterface, {currentStep}) => ({
    ...state,
    currentStep,
  })),
  on(setInvalidStateAction, (state: CheckoutStateInterface, {isInvalid}) => ({
    ...state,
    isCurrentStepInvalid: isInvalid,
  }))
)

export function reducer(state: CheckoutStateInterface, action: Action) {
  return checkoutReducer(state, action)
}
