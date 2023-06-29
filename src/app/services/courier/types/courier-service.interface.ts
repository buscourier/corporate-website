import {createEntityAdapter} from '@ngrx/entity'

export interface CourierServiceInterface {
  name: string
  descr: string
}

export const courierServicesAdapter = createEntityAdapter({})
