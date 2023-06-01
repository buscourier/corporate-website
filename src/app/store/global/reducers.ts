import {Action, createReducer, on} from '@ngrx/store'
import {changePageScrollStateAction} from './actions/change-page-scroll-state.action'
import {changeScreenSizeAction} from './actions/change-screen-size.action'
import {initialState} from './state'
import {GlobalStateInterface} from './types/global-state.interface'

const reducers = createReducer(
  initialState,
  on(changeScreenSizeAction, (state: GlobalStateInterface, {screenSize}) => ({
    ...initialState,
    screenSize,
  })),
  on(
    changePageScrollStateAction,
    (state: GlobalStateInterface, {isBlocked}) => ({
      ...initialState,
      isPageScrollBlocked: isBlocked,
    })
  )
)

export function globalReducer(state: GlobalStateInterface, action: Action) {
  return reducers(state, action)
}
