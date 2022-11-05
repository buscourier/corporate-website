import {EntityInterface} from './entity.interface'
import {PersonInterface} from './person.interface'

export interface StepOneStateInterface {
  activeTabIndex: number
  person?: PersonInterface
  entity?: EntityInterface
}
