import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable, of} from 'rxjs'
import {concatAll, switchMap, toArray} from 'rxjs/operators'
import {OfficeInterface} from 'src/app/shared/types/office.interface'
import {environment} from '../../../environments/environment'

@Injectable()
export class ContactsService {
  constructor(private http: HttpClient) {}

  getOffices(): Observable<OfficeInterface[]> {
    const url = `${environment.apiUrl}/calc/getoffices`

    return this.http.get<OfficeInterface[]>(url).pipe(
      switchMap((offices: OfficeInterface[]) => {
        return of(offices).pipe(
          concatAll(),
          map((office: OfficeInterface) => {
            return {
              ...office,
              geo_x: Number(office.geo_x),
              geo_y: Number(office.geo_y),
            }
          }),
          toArray()
        )
      }),
      map((offices: OfficeInterface[]) => {
        return offices.sort((a: OfficeInterface, b: OfficeInterface) => {
          return a.name.localeCompare(b.name)
        })
      })
    )
  }
}
