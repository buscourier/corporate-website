import {SenderStateInterface} from '../types/sender-state.interface'

export const SENDER_FEATURE = 'sender'

export const initialState: SenderStateInterface = {
  fio: '',
  docType: '',
  docNumber: '',
  phone: '',
  isValid: false,
}
