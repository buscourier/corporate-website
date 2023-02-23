import {checkoutReducer} from '../components/checkout/store/reducer'
import {CHECKOUT_FEATURE} from '../components/checkout/store/state'
import {sidebarReducer} from '../components/sidebar/store/reducer'
import {SIDEBAR_FEATURE} from '../components/sidebar/store/state'
import {endPointReducer} from '../shared/components/end-point/store/reducer'
import {END_POINT_FEATURE} from '../shared/components/end-point/store/state'
import {ordersReducer} from '../shared/components/orders/store/reducer'
import {ORDERS_FEATURE} from '../shared/components/orders/store/state'
import {startPointReducer} from '../shared/components/start-point/store/reducer'
import {START_POINT_FEATURE} from '../shared/components/start-point/store/state'
import {NewOrderStateInterface} from '../types/new-order-state.interface'

export const NEW_ORDER_FEATURE = 'new-order'

export const initialState: NewOrderStateInterface = {
  [START_POINT_FEATURE]: null,
  [END_POINT_FEATURE]: null,
  [ORDERS_FEATURE]: null,
  [CHECKOUT_FEATURE]: null,
  [SIDEBAR_FEATURE]: null,
}

export const reducers = {
  [START_POINT_FEATURE]: startPointReducer,
  [END_POINT_FEATURE]: endPointReducer,
  [ORDERS_FEATURE]: ordersReducer,
  [CHECKOUT_FEATURE]: checkoutReducer,
  [SIDEBAR_FEATURE]: sidebarReducer,
}
