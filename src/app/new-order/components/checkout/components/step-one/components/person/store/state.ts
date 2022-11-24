import {PersonStateInterface} from '../types/person-state.interface'

export const PERSON_FEATURE = 'person'

export const initialState: PersonStateInterface = {
  lastName: '',
  firstName: '',
  middleName: '',
  email: '',
  phone: '',
  role: '',
}
