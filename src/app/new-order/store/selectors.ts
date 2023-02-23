import {createFeatureSelector} from '@ngrx/store'
import {NewOrderStateInterface} from '../types/new-order-state.interface'
import {NEW_ORDER_FEATURE} from './reducers'

export const newOrderFeatureSelector =
  createFeatureSelector<NewOrderStateInterface>(NEW_ORDER_FEATURE)
