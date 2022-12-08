import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {ConfidantInterface} from '../types/confidant.interface'

@Injectable()
export class ConfidantsService {
  constructor(private http: HttpClient) {}

  getData(userId: string): Observable<ConfidantInterface[]> {
    const url = `${environment.apiUrl}/account/contactperson`

    return this.http.get<ConfidantInterface[]>(
      `${url}/${environment.apiKey}/${userId}`
    )
  }
}
