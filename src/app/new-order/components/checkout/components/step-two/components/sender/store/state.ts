import {SenderStateInterface} from '../types/sender-state.interface'

export const SENDER_FEATURE = 'sender'

export const initialState: SenderStateInterface = {
  fio: '',
  docType: null,
  docNumber: '',
  phone: '',
  isConfidantsLoading: false,
  confidants: null,
  isValid: false,
  isPristine: true,
}
