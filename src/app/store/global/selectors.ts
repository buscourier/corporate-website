import {createFeatureSelector, createSelector} from '@ngrx/store'
import {GLOBAL_FEATURE} from './state'
import {GlobalStateInterface} from './types/global-state.interface'

export const globalFeatureSelector =
  createFeatureSelector<GlobalStateInterface>(GLOBAL_FEATURE)

export const screenSizeSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.screenSize
)
