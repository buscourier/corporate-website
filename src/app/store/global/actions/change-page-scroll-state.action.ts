import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const changePageScrollStateAction = createAction(
  ActionTypes.CHANGE_PAGE_SCROLL_STATE,
  props<{isBlocked: boolean}>()
)
