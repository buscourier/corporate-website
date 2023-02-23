import {createSelector} from '@ngrx/store'
import {newOrderFeatureSelector} from '../../../store/selectors'
import {NewOrderStateInterface} from '../../../types/new-order-state.interface'
import {SidebarStateInterface} from '../types/sidebar-state.interface'

export const sidebarSelector = createSelector(
  newOrderFeatureSelector,
  (state: NewOrderStateInterface) => state.sidebar
)

export const isTotalSumCalculatedSelector = createSelector(
  sidebarSelector,
  (state: SidebarStateInterface) => state.isTotalSumCalculated
)
