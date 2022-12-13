import {StartCityInterface} from '../../../shared/types/start-city.interface'
import {ZoneTariffInterface} from './zone-tariff.interface'
import {ZoneInterface} from './zone.interface'

export interface TariffsStateInterface {
  isCitiesLoading: boolean
  isZonesLoading: boolean
  isZoneTariffsLoading: boolean
  cities: StartCityInterface[] | null
  zones: ZoneInterface[] | null
  zoneTariffs: ZoneTariffInterface[] | null
  backendErrors: string | null
}
