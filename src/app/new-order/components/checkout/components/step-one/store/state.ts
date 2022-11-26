import {StepOneStateInterface} from '../types/step-one-state.interface'

export const STEP_ONE_FEATURE = 'stepOne'

export const initialState: StepOneStateInterface = {
  activeTabIndex: -1,
  entity: null,
}
