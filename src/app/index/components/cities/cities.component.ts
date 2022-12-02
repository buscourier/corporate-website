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
import {combineLatest, filter, map, Observable} from 'rxjs'
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

type cityNameType = string

interface CityGroupInterface {
  [key: string]: cityNameType[]
}

type CitiesInterface = []

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent implements OnInit {
  isLoading$: Observable<boolean>
  cities$: Observable<any>
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
      filter(Boolean),
      map((cities: StartCityInterface[] | EndCityInterface[]) => {
        return cities.map(
          (city: StartCityInterface | EndCityInterface) => city.name
        )
      }),
      map((names: cityNameType[]) => {
        return this.letters.reduce(
          (obj: object, letter: string) => ({
            ...obj,
            [letter]: names.filter((city) => city.charAt(0) === letter),
          }),
          {}
        )
      }),
      map((cities: CityGroupInterface) => {
        return Object.entries(cities)
          .filter((obj: [string, any]) => {
            return obj[1].length
          })
          .map(([char, list]) => {
            return [
              char,
              list.sort((a: string, b: string) => a.localeCompare(b)),
            ]
          })
      }),
      map((cities: any) => {
        return [cities.splice(0, Math.ceil(cities.length / 2)), cities]
      }),
      tap((result: any) => {
        console.log('cities', result)
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
