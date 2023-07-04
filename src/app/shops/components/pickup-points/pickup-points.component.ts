import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {tuiFadeIn} from '@taiga-ui/core'
import {filter, map, Observable, of, switchMap} from 'rxjs'
import {concatAll, tap, toArray} from 'rxjs/operators'
import {MapPointInterface} from 'src/app/shared/types/map-point.interface'
import {OfficeInterface} from '../../../shared/types/office.interface'
import {isNotSmallScreenSelector} from '../../../store/global/selectors'
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
  IML?: DepartmentInterface[]
  HERMES?: DepartmentInterface[]
  CSE?: DepartmentInterface[]
  Boxberry?: DepartmentInterface[]
  Винлаб?: DepartmentInterface[]
}

const pickupPointNames = ['IML', 'HERMES', 'CSE', 'Boxberry', 'Винлаб']

@Component({
  selector: 'app-pickup-points',
  templateUrl: './pickup-points.component.html',
  styleUrls: ['./pickup-points.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class PickupPointsComponent implements OnInit {
  isDepartmentsLoading$: Observable<boolean>
  departments$: Observable<OfficeInterface[]>
  points$: Observable<PickupPointsInterface>
  backendErrors$: Observable<string>
  isNotSmallScreen$: Observable<boolean>

  currentTab = null
  currentMapPoints: MapPointInterface[] = []

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isNotSmallScreen$ = this.store.select(isNotSmallScreenSelector)
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
        return pickupPointNames.reduce(
          (acc, point: string) => {
            return {
              ...acc,
              [point]: departments.filter(
                (office: any) => JSON.parse(office.pvz)[point]
              ),
            }
          },
          {IML: [], HERMES: [], CSE: [], Boxberry: [], Винлаб: []}
        )
      }),

      map((points: PickupPointsInterface) => {
        const filteredPoints = Object.entries(points).filter(
          (point: [string, Array<any>]) => {
            return point[1].length
          }
        )

        this.setCurrentTab(filteredPoints[0][0], filteredPoints[0][1])

        return filteredPoints.reduce((obj, point: [string, Array<any>]) => {
          return {
            ...obj,
            [point[0]]: point[1],
          }
        }, {})
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

  setCurrentTab(key: string, points) {
    this.currentTab = key

    this.setMapPoints(points[0].mapPoints)
  }
}
