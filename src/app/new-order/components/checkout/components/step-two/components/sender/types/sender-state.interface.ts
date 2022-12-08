import {ConfidantInterface} from '../../../../../../../../shared/types/confidant.interface'
import {DocTypeInterface} from '../../../../../../../../shared/types/doc-type.interface'

export interface SenderStateInterface {
  fio: string
  docType: DocTypeInterface | null
  docNumber: string | null
  phone: string
  isConfidantsLoading: boolean
  confidants: ConfidantInterface[] | null
  isValid?: boolean
  isPristine?: boolean
}
