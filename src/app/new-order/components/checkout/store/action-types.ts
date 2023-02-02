export enum ActionTypes {
  SET_CURRENT_STEP = '[Checkout] Current step changed',
  SET_PREVIOUS_STEP = '[Checkout] Previous step changed',
  SET_CURRENT_STEP_STATE = '[Checkout] State changed',
  UPDATE_FINISHED_STEPS = '[Checkout] Finished steps updated',

  SEND_ORDER = '[Checkout] Send order',
  SEND_ORDER_SUCCESS = '[Checkout] Send order success',
  SEND_ORDER_FAILURE = '[Checkout] Send order failure',

  SEND_WEBHOOK = '[Checkout] Send webhook',
  SEND_WEBHOOK_SUCCESS = '[Checkout] Send webhook success',
  SEND_WEBHOOK_FAILURE = '[Checkout] Send webhook failure',
}
