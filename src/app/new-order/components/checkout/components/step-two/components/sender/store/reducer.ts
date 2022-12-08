import {Action, createReducer, on} from '@ngrx/store'
import {SenderStateInterface} from '../types/sender-state.interface'
import {changeValidityAction} from './actions/change-validity.action'
import {changeValuesAction} from './actions/change-values.action'
import {
  getConfidantsAction,
  getConfidantsFailureAction,
  getConfidantsSuccessAction,
} from './actions/get-confidants.action'
import {resetSenderAction} from './actions/reset-sender.action'
import {initialState} from './state'

export const senderReducer = createReducer(
  initialState,
  on(changeValuesAction, (state: SenderStateInterface, action) => ({
    ...state,
    ...action, //TODO: just ...action state here in other forms?
    isPristine: false,
  })),
  on(changeValidityAction, (state: SenderStateInterface, {isValid}) => ({
    ...state,
    isValid,
  })),
  on(resetSenderAction, (state: SenderStateInterface) => ({
    ...state,
    ...initialState, //TODO: just ...initialState here in other forms?
  })),
  on(getConfidantsAction, (state: SenderStateInterface) => ({
    ...state,
    isConfidantsLoading: true,
  })),
  on(
    getConfidantsSuccessAction,
    (state: SenderStateInterface, {confidants}) => ({
      ...state,
      isConfidantsLoading: false,
      confidants,
    })
  ),
  on(getConfidantsFailureAction, (state: SenderStateInterface) => ({
    ...state,
    isConfidantsLoading: false,
  }))
)

export function reducer(state: SenderStateInterface, action: Action) {
  return senderReducer(state, action)
}
