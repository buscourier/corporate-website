import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {OfficeInterface} from 'src/app/shared/types/office.interface'
import {environment} from '../../../environments/environment'

@Injectable()
export class ContactsService {
  constructor(private http: HttpClient) {}

  getOffices(): Observable<OfficeInterface[]> {
    const url = `${environment.apiUrl}/calc/getoffices`

    return this.http.get<OfficeInterface[]>(url)
  }
}
