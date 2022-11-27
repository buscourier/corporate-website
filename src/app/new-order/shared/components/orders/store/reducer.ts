import {Action, createReducer, on} from '@ngrx/store'
import {OrdersStateInterface} from '../types/orders-state.interface'
import {allCargosLoadedAction} from './actions/all-cargos-loaded.action'
import {allServicesLoadedAction} from './actions/all-services-loaded.action'
import {changeActiveOrderAction} from './actions/change-active-order.action'
import {changeValidityAction} from './actions/change-validity.action'
import {
  getAllCargosAction,
  getAllCargosFailureAction,
  getAllCargosSuccessAction,
} from './actions/get-all-cargos.action'
import {
  getAllServicesAction,
  getAllServicesFailureAction,
  getAllServicesSuccessAction,
} from './actions/get-all-services.action'
import {ordersValueChangesAction} from './actions/orders-value-changes.action'
import {resetOrdersAction} from './actions/reset-orders.action'
import {initialState} from './state'

const ordersReducer = createReducer(
  initialState,
  on(getAllCargosAction, (state: OrdersStateInterface) => ({
    ...state,
    isAllCargosLoading: true,
  })),
  on(getAllCargosSuccessAction, (state: OrdersStateInterface, {cargos}) => ({
    ...state,
    isAllCargosLoading: false,
    allCargos: cargos,
  })),
  on(getAllCargosFailureAction, (state: OrdersStateInterface, {errors}) => ({
    ...state,
    isAllCargosLoading: false,
    backendErrors: errors,
  })),
  on(allCargosLoadedAction, (state: OrdersStateInterface, {loaded}) => ({
    ...state,
    isAllCargosLoaded: loaded,
  })),
  on(getAllServicesAction, (state: OrdersStateInterface) => ({
    ...state,
    isAllServicesLoading: true,
  })),
  on(
    getAllServicesSuccessAction,
    (state: OrdersStateInterface, {services}) => ({
      ...state,
      isAllServicesLoading: false,
      allServices: services,
    })
  ),
  on(getAllServicesFailureAction, (state: OrdersStateInterface, {errors}) => ({
    ...state,
    isAllServicesLoading: false,
    backendErrors: errors,
  })),
  on(allServicesLoadedAction, (state: OrdersStateInterface, {loaded}) => ({
    ...state,
    isAllServicesLoaded: loaded,
  })),
  on(ordersValueChangesAction, (state: OrdersStateInterface, {orders}) => ({
    ...state,
    ...orders,
    isPristine: false,
  })),
  on(
    changeActiveOrderAction,
    (state: OrdersStateInterface, {activeOrderIndex}) => ({
      ...state,
      activeOrderIndex,
    })
  ),
  on(changeValidityAction, (state: OrdersStateInterface, {isValid}) => ({
    ...state,
    isValid,
  })),
  on(resetOrdersAction, (state: OrdersStateInterface) => ({
    ...state,
    ...initialState,
  }))
  // on(initOrdersAction, (state: OrdersStateInterface, {isInitialized}) => ({
  //   ...state,
  //   isInitialized,
  // }))
)

export function reducer(state: OrdersStateInterface, action: Action) {
  return ordersReducer(state, action)
}
