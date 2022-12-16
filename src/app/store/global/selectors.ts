import {createFeatureSelector, createSelector} from '@ngrx/store'
import {GLOBAL_FEATURE} from './state'
import {GlobalStateInterface} from './types/global-state.interface'

export const globalFeatureSelector =
  createFeatureSelector<GlobalStateInterface>(GLOBAL_FEATURE)

export const screenSizeSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.screenSize
)

export const xsScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.screenSize === 'xs'
)

export const smScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.screenSize === 'sm'
)

export const mdScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.screenSize === 'md'
)

export const lgScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.screenSize === 'lg'
)

export const xlScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.screenSize === 'xl'
)

export const isPhoneScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) =>
    state.screenSize === 'xs' || state.screenSize === 'sm'
)

export const isLargeScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) =>
    state.screenSize === 'lg' ||
    state.screenSize === 'xl' ||
    state.screenSize === 'xxl'
)

export const isNotSmallScreenSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) =>
    state.screenSize === 'md' ||
    state.screenSize === 'lg' ||
    state.screenSize === 'xl' ||
    state.screenSize === 'xxl'
)

export const isPageScrollBlockedSelector = createSelector(
  globalFeatureSelector,
  (state: GlobalStateInterface) => state.isPageScrollBlocked
)
