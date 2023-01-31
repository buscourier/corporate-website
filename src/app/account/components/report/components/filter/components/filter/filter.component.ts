import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  Self,
} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs'
import {tap} from 'rxjs/operators'
import {STRINGIFY_CITIES} from '../../../../../../../shared/handlers/string-handlers'
import {EndCityInterface} from '../../../../../../../shared/types/end-city.interface'
import {StartCityInterface} from '../../../../../../../shared/types/start-city.interface'
import {getEndCitiesAction} from '../../store/actions/get-end-cities.action'
import {getStartCitiesAction} from '../../store/actions/get-start-cities.action'
import {
  backendErrorsSelector,
  endCitiesSelector,
  isEndCitiesLoadingSelector,
  isStartCitiesLoadingSelector,
  startCitiesSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_CITIES}),
    TuiDestroyService,
    tuiLoaderOptionsProvider({
      size: 'm',
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  isStartCitiesLoading$: Observable<boolean>
  isEndCitiesLoading$: Observable<boolean>
  startCities$: Observable<StartCityInterface[]>
  endCities$: Observable<EndCityInterface[]>
  backendErrors$: Observable<null | string>
  searchStartCity$: Subject<string | null> = new Subject()
  searchEndCity$: Subject<string | null> = new Subject()

  @Output('filterChanged') filterChangedEvent = new EventEmitter<any>()

  form = this.fb.group({
    range: [],
    startCity: [{value: null, disabled: true}],
    endCity: [{value: null, disabled: true}],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isStartCitiesLoading$ = this.store.select(isStartCitiesLoadingSelector)
    this.isEndCitiesLoading$ = this.store.select(isEndCitiesLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.startCities$ = combineLatest([
      this.store.select(startCitiesSelector).pipe(
        filter(Boolean),
        tap((cities: StartCityInterface[]) => {
          if (cities && this.form.get('startCity').disabled) {
            this.form.get('startCity').enable()
          }
        })
      ),
      this.searchStartCity$.pipe(
        startWith(''),
        filter((searchQuery: string | null) => searchQuery !== null)
      ),
    ]).pipe(
      debounceTime(1000),
      map(([cities, searchQuery]: [StartCityInterface[], string]) => {
        return cities.filter((city: StartCityInterface) => {
          return city.name
            .toLowerCase()
            .includes(searchQuery && searchQuery.toLowerCase())
        })
      })
    )

    this.endCities$ = combineLatest([
      this.store.select(endCitiesSelector).pipe(
        filter(Boolean),
        tap((cities: EndCityInterface[]) => {
          if (cities && this.form.get('endCity').disabled) {
            this.form.get('endCity').enable()
          }
        })
      ),
      this.searchEndCity$.pipe(
        startWith(''),
        filter((searchQuery: string | null) => searchQuery !== null)
      ),
    ]).pipe(
      debounceTime(1000),
      map(([cities, searchQuery]: [EndCityInterface[], string]) => {
        return cities.filter((city: EndCityInterface) => {
          return city.name
            .toLowerCase()
            .includes(searchQuery && searchQuery.toLowerCase())
        })
      })
    )

    this.form
      .get('startCity')
      .valueChanges.pipe(
        filter(Boolean),
        tap(({id}: StartCityInterface) => {
          this.form.get('endCity').patchValue('')
          this.store.dispatch(getEndCitiesAction({cityId: id}))
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  fetchData(): void {
    this.store.dispatch(getStartCitiesAction())
  }

  onSearchStartCityChange(searchQuery: string | null): void {
    this.searchStartCity$.next(searchQuery)
  }

  onSearchEndCityChange(searchQuery: string | null): void {
    this.searchEndCity$.next(searchQuery)
  }

  onSubmit() {
    this.filterChangedEvent.emit(this.form.value)
  }
}
