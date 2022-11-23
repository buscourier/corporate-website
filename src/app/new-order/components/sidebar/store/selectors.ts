import {createFeatureSelector, createSelector} from '@ngrx/store'
import {SidebarStateInterface} from '../types/sidebar-state.interface'
import {SIDEBAR_FEATURE} from './state'

export const sidebarFeatureSelector =
  createFeatureSelector<SidebarStateInterface>(SIDEBAR_FEATURE)

export const isTotalSumCalculatedSelector = createSelector(
  sidebarFeatureSelector,
  (state: SidebarStateInterface) => state.isTotalSumCalculated
)
