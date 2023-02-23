import CheckoutEffects from '../components/checkout/store/effects/checkout.effects'
import EndPointEffects from '../shared/components/end-point/store/effects/end-point.effects'
import OrdersEffects from '../shared/components/orders/store/effects/orders.effects'
import startPointEffects from '../shared/components/start-point/store/effects/start-point.effects'

export const effects = [
  ...startPointEffects,
  ...EndPointEffects,
  ...OrdersEffects,
  ...CheckoutEffects,
]
