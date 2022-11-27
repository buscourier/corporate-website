import {createFeatureSelector, createSelector} from '@ngrx/store'
import {PersonStateInterface} from '../types/person-state.interface'
import {PERSON_FEATURE} from './state'

export const personFeatureSelector =
  createFeatureSelector<PersonStateInterface>(PERSON_FEATURE)

export const personSelector = createSelector(
  personFeatureSelector,
  (state: PersonStateInterface) => state
)

export const isPersonValidSelector = createSelector(
  personFeatureSelector,
  (state: PersonStateInterface) => state.isValid
)

export const isPersonPristineSelector = createSelector(
  personFeatureSelector,
  (state: PersonStateInterface) => state.isPristine
)
