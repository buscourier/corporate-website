import {ProxyPersonInterface} from '../../../../../../../shared/types/proxy-person.interface'
import {EntityProfileInterface} from '../../../types/entity-profile.interface'

export interface EntityProfileStateInterface {
  isProfileLoading: boolean
  isProxyLoading: boolean
  backendErrors: string | null
  profile: EntityProfileInterface | null
  proxy: ProxyPersonInterface[] | null
}
