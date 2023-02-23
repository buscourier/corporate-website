import {createFeatureSelector} from '@ngrx/store'
import {IndexStateInterface} from '../types/index-state.interface'
import {INDEX_FEATURE} from './reducers'

export const IndexFeatureSelector =
  createFeatureSelector<IndexStateInterface>(INDEX_FEATURE)
