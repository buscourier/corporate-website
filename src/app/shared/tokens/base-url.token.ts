import {InjectionToken} from '@angular/core'

export const BASE_URL = new InjectionToken('Base url', {
  factory: () => 'https://api.busbox.guru/v1',
  providedIn: 'root',
})
