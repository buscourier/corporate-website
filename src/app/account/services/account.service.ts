import {Injectable} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {ProfileInterface} from '../components/profile/shared/types/profile.interface'
import {HttpClient} from '@angular/common/http'
import {BalanceResponseInterface} from '../components/balance/types/balance-response.interface'
import {UserProfileInterface} from '../types/user-profile.interface'
import {BalanceInterface} from '../components/balance/types/balance.interface'

@Injectable()
export class AccountService {
  url = `${environment.apiUrl}/account`

  constructor(private http: HttpClient) {}

  getProfile(userId: string): Observable<UserProfileInterface> {
    const url = `${this.url}/details`

    return this.http
      .get<ProfileInterface[]>(`${url}/${environment.apiKey}/${userId}`)
      .pipe(
        filter(Boolean),
        map((profile: ProfileInterface[]) => {
          return [...profile].reduce((obj, item: ProfileInterface) => {
            return {
              ...obj,
              [item.alias]: item,
            }
          }, {})
        })
      )
  }

  getBalance(userId: string): Observable<BalanceInterface> {
    const url = `${this.url}/balance`

    return this.http
      .get<BalanceResponseInterface>(`${url}/${environment.apiKey}/${userId}`)
      .pipe(
        filter(Boolean),
        map((balance: BalanceResponseInterface) => {
          return {
            period: `${balance.first_period_date} - ${balance.last_period_date}`,
            debet: Number(balance.debet),
            orderSum: Number(balance.order_sum),
            serviceSum: Number(balance.service_sum),
            total:
              Number(balance.debet) -
              (Number(balance.order_sum) + Number(balance.service_sum)),
          }
        })
      )
  }
}
