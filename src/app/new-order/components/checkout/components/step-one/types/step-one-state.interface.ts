import {EntityInterface} from './entity.interface'
import {PersonStateInterface} from '../components/person/types/person-state.interface'

export interface StepOneStateInterface {
  activeTabIndex: number
  person?: PersonStateInterface
  entity?: EntityInterface
}
