import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Store} from '@ngrx/store'
import {combineLatest, map, Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {StartCityInterface} from 'src/app/shared/types/start-city.interface'
import {getCitiesAction} from './store/actions/get-cities.action'
import {
  backendErrorsSelector,
  citiesSelector,
  isCitiesLoadingSelector,
} from './store/selectors'

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TariffComponent implements OnInit, AfterViewInit {
  isCitiesLoading$: Observable<boolean>
  cities$: Observable<StartCityInterface[]>
  filteredCities$: Observable<StartCityInterface[]>
  backendErrors: Observable<string>

  regions = [
    {id: 1, name: 'Приморский край'},
    {id: 14, name: 'Хабаровский край'},
  ]

  region = new FormControl(null)
  city = new FormControl(null)

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    this.region.setValue(this.regions[0])
  }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isCitiesLoading$ = this.store.select(isCitiesLoadingSelector)
    this.cities$ = this.store.select(citiesSelector)
    this.backendErrors = this.store.select(backendErrorsSelector)

    this.filteredCities$ = combineLatest([
      this.region.valueChanges,
      this.cities$,
    ]).pipe(
      map(([region, cities]) => {
        let filteredCities = null

        if (!cities) {
          return []
        }

        if (region.id === 14) {
          filteredCities = cities.filter((city: StartCityInterface) => {
            return Number(city.site_id) === 14
          })
        } else {
          filteredCities = cities.filter((city: StartCityInterface) => {
            return Number(city.site_id) !== 14
          })
        }

        return filteredCities
      }),
      tap((cities: StartCityInterface[]) => {
        this.city.setValue(cities[0])
      })
    )
  }

  fetchData(): void {
    this.store.dispatch(getCitiesAction())
  }
}
