import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {combineLatest, map, Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {EndCityInterface} from '../../../shared/types/end-city.interface'
import {StartCityInterface} from '../../../shared/types/start-city.interface'
import {getEndCitiesAction} from './store/actions/get-end-cities.action'
import {getStartCitiesAction} from './store/actions/get-start-cities.action'
import {
  backendErrorsSelector,
  endCitiesSelector,
  isLoadingSelector,
  startCitiesSelector,
} from './store/selectors'

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent implements OnInit {
  isLoading$: Observable<boolean>
  cities$: Observable<StartCityInterface[] | EndCityInterface[]>
  backendErrors$: Observable<null | string>

  constructor(
    private store: Store,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.cities$ = combineLatest([
      this.store.select(startCitiesSelector),
      this.store.select(endCitiesSelector),
    ]).pipe(
      map(([startCities, endCities]) => {
        let cities = []

        if (this.type === 'start') {
          cities = startCities
        } else if (this.type === 'end') {
          cities = endCities
        } else {
          cities = []
        }

        return cities
      }),
      tap((cities: any) => {
        // this.cities = cities
      })
    )
  }

  fetchData(): void {
    if (this.type === 'start') {
      this.store.dispatch(getStartCitiesAction())
    } else {
      this.store.dispatch(getEndCitiesAction({cityId: '1'}))
    }
  }

  get type(): string {
    return this.context.data.type
  }
}
