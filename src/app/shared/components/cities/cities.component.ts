import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDialogContext, tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  mergeMap,
  Observable,
  startWith,
} from 'rxjs'
import {EndCityInterface} from '../../types/end-city.interface'
import {StartCityInterface} from '../../types/start-city.interface'
import {getEndCitiesAction} from './store/actions/get-end-cities.action'
import {getStartCitiesAction} from './store/actions/get-start-cities.action'
import {
  backendErrorsSelector,
  endCitiesSelector,
  isLoadingSelector,
  startCitiesSelector,
} from './store/selectors'
import {CitiesGroupInterface} from './types/cities-group.interface'
import {CityNameType} from './types/city-name.type'
import {dueTime} from '../../../settings'

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [
    tuiLoaderOptionsProvider({
      size: 'l',
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent implements OnInit {
  isLoading$: Observable<boolean>
  cities$: Observable<StartCityInterface[] | EndCityInterface[]>
  searchResult$: Observable<any>
  backendErrors$: Observable<null | string>

  private letters = [
    'А',
    'Б',
    'В',
    'Г',
    'Д',
    'Е',
    'Ж',
    'З',
    'И',
    'К',
    'Л',
    'М',
    'Н',
    'О',
    'П',
    'Р',
    'С',
    'Т',
    'У',
    'Ф',
    'Х',
    'Ц',
    'Ч',
    'Ш',
    'Щ',
    'Э',
    'Ю',
    'Я',
  ]

  search = this.fb.control('')

  form = this.fb.group({
    search: this.search,
  })

  constructor(
    private store: Store,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()

    this.searchResult$ = this.search.valueChanges.pipe(
      debounceTime(dueTime),
      startWith(this.search.value),
      mergeMap((search: string) => {
        return this.cities$.pipe(
          map((cities: StartCityInterface[] | EndCityInterface[] | any[]) => {
            return cities.filter(
              (city: StartCityInterface | EndCityInterface | any) => {
                return city.name.toLowerCase().includes(search.toLowerCase())
              }
            )
          }),
          map((cities: StartCityInterface[] | EndCityInterface[]) => {
            return cities.map(
              (city: StartCityInterface | EndCityInterface) => city.name
            )
          }),
          map((names: CityNameType[]) => {
            return this.letters.reduce(
              (obj: object, letter: string) => ({
                ...obj,
                [letter]: names.filter(
                  (city: CityNameType) => city.charAt(0) === letter
                ),
              }),
              {}
            )
          }),
          map((cities: CitiesGroupInterface) => {
            return Object.entries(cities)
              .filter((obj: [string, any]) => {
                return obj[1].length
              })
              .map(([char, list]) => {
                //Todo: maybe better array instead object?
                return {
                  [char]: list.sort((a: string, b: string) =>
                    a.localeCompare(b)
                  ),
                }
              })
          }),
          map((cities: CitiesGroupInterface[]) => {
            return [cities.splice(0, Math.ceil(cities.length / 2)), cities]
          })
        )
      })
    )
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
      filter(Boolean)
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

  close() {
    this.context.completeWith(1)
  }
}
