import {createFeatureSelector, createSelector} from '@ngrx/store'
import {PERSON_FEATURE} from './state'
import {PersonStateInterface} from '../types/person-state.interface'

export const senderFeatureSelector =
  createFeatureSelector<PersonStateInterface>(PERSON_FEATURE)

export const personSelector = createSelector(
  senderFeatureSelector,
  (state: PersonStateInterface) => state
)
