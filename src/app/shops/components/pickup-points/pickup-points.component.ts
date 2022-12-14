import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {filter, map, Observable, of, switchMap} from 'rxjs'
import {concatAll, tap, toArray} from 'rxjs/operators'
import {OfficeInterface} from '../../../shared/types/office.interface'
import {getDepartmentsAction} from './store/actions/get-departments.action'
import {
  backendErrorsSelector,
  departmentsSelector,
  isDepartmentsLoadingSelector,
} from './store/selectors'

interface PickupPointsInterface {
  IML: OfficeInterface[]
  HERMES: OfficeInterface[]
  CSE: OfficeInterface[]
  Boxberry: OfficeInterface[]
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
          toArray()
        )
      }),
      map((departments: OfficeInterface[]) => {
        return pickupPoints.reduce(
          (acc, point: string) => {
            return {
              ...acc,
              [point]: departments.filter(
                (office: OfficeInterface) => JSON.parse(office.pvz)[point]
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
}
