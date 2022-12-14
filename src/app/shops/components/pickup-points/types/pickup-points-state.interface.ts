import {OfficeInterface} from '../../../../shared/types/office.interface'

export interface PickupPointsStateInterface {
  isDepartmentsLoading: boolean
  departments: OfficeInterface[] | null
  backendErrors: string | null
}
