import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Store} from '@ngrx/store'
import {combineLatest, filter, map, Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {StartCityInterface} from 'src/app/shared/types/start-city.interface'
import {getCitiesAction} from './store/actions/get-cities.action'
import {getZoneTariffsAction} from './store/actions/get-zone-tariffs.action'
import {getZonesAction} from './store/actions/get-zones.action'
import {
  backendErrorsSelector,
  citiesSelector,
  isCitiesLoadingSelector,
  isZonesLoadingSelector,
  isZoneTariffsLoadingSelector,
  zonesSelector,
  zoneTariffsSelector,
} from './store/selectors'
import {ZoneTariffInterface} from './types/zone-tariff.interface'
import {ZoneInterface} from './types/zone.interface'

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TariffComponent implements OnInit, AfterViewInit {
  isCitiesLoading$: Observable<boolean>
  isZonesLoading$: Observable<boolean>
  isZoneTariffsLoading$: Observable<boolean>
  cities$: Observable<StartCityInterface[]>
  zones$: Observable<ZoneInterface[]>
  zoneTariffs$: Observable<ZoneTariffInterface[]>
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
    this.isZonesLoading$ = this.store.select(isZonesLoadingSelector)
    this.isZoneTariffsLoading$ = this.store.select(isZoneTariffsLoadingSelector)
    this.cities$ = this.store.select(citiesSelector)
    this.zones$ = this.store.select(zonesSelector)
    this.zoneTariffs$ = this.store.select(zoneTariffsSelector)
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

    this.city.valueChanges
      .pipe(
        filter(Boolean),
        tap((city: StartCityInterface) => {
          //TODO maybe switch map?
          this.store.dispatch(getZonesAction({id: city.site_id}))
          this.store.dispatch(getZoneTariffsAction({id: city.site_id}))
        })
      )
      .subscribe()
  }

  fetchData(): void {
    this.store.dispatch(getCitiesAction())
  }
}
