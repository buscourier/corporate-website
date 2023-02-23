import {CHECKOUT_FEATURE} from '../components/checkout/store/state'
import {CheckoutStateInterface} from '../components/checkout/types/checkout-state.interface'
import {SIDEBAR_FEATURE} from '../components/sidebar/store/state'
import {SidebarStateInterface} from '../components/sidebar/types/sidebar-state.interface'
import {END_POINT_FEATURE} from '../shared/components/end-point/store/state'
import {EndPointStateInterface} from '../shared/components/end-point/types/end-point-state.interface'
import {ORDERS_FEATURE} from '../shared/components/orders/store/state'
import {OrdersStateInterface} from '../shared/components/orders/types/orders-state.interface'
import {START_POINT_FEATURE} from '../shared/components/start-point/store/state'
import {StartPointStateInterface} from '../shared/components/start-point/types/start-point-state.interface'

export interface NewOrderStateInterface {
  [START_POINT_FEATURE]: StartPointStateInterface | null
  [END_POINT_FEATURE]: EndPointStateInterface | null
  [ORDERS_FEATURE]: OrdersStateInterface | null
  [CHECKOUT_FEATURE]: CheckoutStateInterface | null
  [SIDEBAR_FEATURE]: SidebarStateInterface | null
}
