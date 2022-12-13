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

const ZoneId = {
  'Зона 1': 1,
  'Зона 2': 2,
  'Зона 3': 3,
  'Зона 4': 4,
  'Зона 5': 5,
  'Зона 6': 6,
}

const ParcelWeight = {
  '0 - 20': 0,
  '20 - 40': 1,
  '40 - 60': 2,
  '60 - 80': 3,
  '80 - 100': 4,
}

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
  docsAndParcelsZoneTariffs$: Observable<any>
  autoDetailsZoneTariffs$: Observable<any>
  otherZoneTariffs$: Observable<any>
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

    this.autoDetailsZoneTariffs$ = this.getZoneTariffs('Автозапчасти')
    this.otherZoneTariffs$ = this.getZoneTariffs('Другое')
    this.docsAndParcelsZoneTariffs$ = this.zoneTariffs$.pipe(
      filter(Boolean),
      map((zones: ZoneTariffInterface[]) => {
        return zones.filter((zone: ZoneTariffInterface) => {
          return (
            zone.main_type === 'Документы (формат А4)' ||
            zone.main_type === 'Посылки'
          )
        })
      }),
      map((zones: ZoneTariffInterface[]) => {
        return zones.map((zone: ZoneTariffInterface) => {
          return {
            name: zone.zone,
            data: {
              id: ZoneId[zone.id],
              price: zone.price,
              size: zone.size,
              weight: zone.weight,
              type: zone.type,
            },
          }
        })
      }),
      map((zones: any) => {
        const reduced = zones.reduce((acc, {name, data}) => {
          acc[name] ??= {name: name, data: []}
          acc[name].data.push(data)
          return acc
        }, {})

        return Object.values(reduced)
      }),
      map((zones: any) => {
        return zones.map(({name, data}) => {
          const reduced = data.reduce((acc, {type, size, weight, price}) => {
            acc[size] ??= {size: size, data: [null, null, null, null, null]}
            acc[size].data.splice(ParcelWeight[weight], 1, {
              type,
              size,
              weight,
              price,
            })
            return acc
          }, {})

          return {name, data: Object.values(reduced)}
        })
      }),
      map((zones: any) => {
        return zones.map(({name, data}) => {
          const lastItem = data.pop()

          if (lastItem.size) {
            data.push(lastItem)
          } else {
            data[0].docs = lastItem.data[0].price
          }

          return {name, data}
        })
      })
    )

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

  getZoneTariffs(type) {
    return this.zoneTariffs$.pipe(
      filter(Boolean),
      map((zones: ZoneTariffInterface[]) => {
        return zones.filter((zone: ZoneTariffInterface) => {
          return zone.main_type === type
        })
      }),
      map((zones: ZoneTariffInterface[]) => {
        return zones.map((zone: ZoneTariffInterface) => {
          return {
            name: zone.type,
            data: {id: ZoneId[zone.zone], price: zone.price, name: zone.zone},
          }
        })
      }),
      map((zones: any) => {
        const reduced = zones.reduce((acc, {name, data}) => {
          acc[name] ??= {name, data: [null, null, null, null, null, null, null]}
          acc[name].data.splice(data.id - 1, 1, data)
          return acc
        }, {})

        return Object.values(reduced)
      })
    )
  }

  fetchData(): void {
    this.store.dispatch(getCitiesAction())
  }
}