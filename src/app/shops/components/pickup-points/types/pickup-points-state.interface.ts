import {OfficeInterface} from '../../../../shared/types/office.interface'

export interface PickupPointsStateInterface {
  isPointsLoading: boolean
  points: OfficeInterface[] | null
  backendErrors: string | null
}
