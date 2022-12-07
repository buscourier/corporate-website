import {DocTypeInterface} from '../../../../../../../../shared/types/doc-type.interface'

export interface SenderStateInterface {
  fio: string
  docType: DocTypeInterface | null
  docNumber: string
  phone: string
  isValid?: boolean
  isPristine?: boolean
}
