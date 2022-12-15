import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {filter, map, Observable, of, switchMap} from 'rxjs'
import {concatAll, tap, toArray} from 'rxjs/operators'
import {MapPointInterface} from 'src/app/shared/types/map-point.interface'
import {OfficeInterface} from '../../../shared/types/office.interface'
import {getDepartmentsAction} from './store/actions/get-departments.action'
import {
  backendErrorsSelector,
  departmentsSelector,
  isDepartmentsLoadingSelector,
} from './store/selectors'

interface DepartmentInterface {
  office_id: string
  name: string
  mapPoints: MapPointInterface[]
  info: Array<{type: string; text: string}>
  pvz: ''
}

interface PickupPointsInterface {
  IML: DepartmentInterface[]
  HERMES: DepartmentInterface[]
  CSE: DepartmentInterface[]
  Boxberry: DepartmentInterface[]
}

const pickupPoints = ['IML', 'HERMES', 'CSE', 'Boxberry']

@Component({
  selector: 'app-pickup-points',
  templateUrl: './pickup-points.component.html',
  styleUrls: ['./pickup-points.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickupPointsComponent implements OnInit {
  isDepartmentsLoading$: Observable<boolean>
  departments$: Observable<OfficeInterface[]>
  points$: Observable<PickupPointsInterface>
  backendErrors$: Observable<string>

  currentPoint = pickupPoints[0]
  currentMapPoints: MapPointInterface[] = []

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isDepartmentsLoading$ = this.store.select(isDepartmentsLoadingSelector)
    this.points$ = this.store.select(departmentsSelector).pipe(
      filter(Boolean),
      switchMap((departments: OfficeInterface[]) => {
        return of(departments).pipe(
          concatAll(),
          filter((department: OfficeInterface) => {
            return department.pvz !== null
          }),
          map((department: OfficeInterface) => {
            return {
              office_id: department.office_id,
              name: department.name,
              mapPoints: [
                {
                  geo_x: department.geo_x,
                  geo_y: department.geo_y,
                },
              ],
              info: [
                [
                  {
                    type: 'Адрес:',
                    text: department.address,
                  },
                  {
                    type: 'Режим работы:',
                    text:
                      JSON.parse(department.pvz_comment)['this.id'] ||
                      department.worktime,
                  },
                ],
              ],
              pvz: department.pvz,
            }
          }),
          toArray(),
          map((departments: any) => {
            const reduced = departments.splice(0, 3).reduce(
              (obj, department) => {
                return {
                  office_id: department.office_id,
                  name: 'Владивосток',
                  mapPoints: [...obj.mapPoints, ...department.mapPoints],
                  info: [...obj.info, ...department.info],
                  pvz: department.pvz,
                }
              },
              {office_id: '', name: '', mapPoints: [], info: [], pvz: ''}
            )

            return [reduced, ...departments]
          })
        )
      }),
      map((departments: DepartmentInterface[]) => {
        return pickupPoints.reduce(
          (acc, point: string) => {
            return {
              ...acc,
              [point]: departments.filter(
                (office: any) => JSON.parse(office.pvz)[point]
              ),
            }
          },
          {IML: [], HERMES: [], CSE: [], Boxberry: []}
        )
      }),

      tap((data) => {
        console.log('data', data)
      })
    )
    this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  fetchData(): void {
    this.store.dispatch(getDepartmentsAction())
  }

  getPointsKeys(points) {
    return Object.keys(points)
  }

  setMapPoints(points: MapPointInterface[]) {
    this.currentMapPoints = points
  }

  setCurrentPoint(key: string) {
    this.currentPoint = key
  }
}
