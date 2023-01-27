import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {
  combineLatest,
  debounceTime,
  delay,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs'
import {tap} from 'rxjs/operators'
import {changeCityAction as changeEndCityAction} from '../../../new-order/shared/components/end-point/store/actions/change-city.action'
import {changeCityAction as changeStartCityAction} from '../../../new-order/shared/components/start-point/store/actions/change-city.action'
import {STRINGIFY_CITIES} from '../../../shared/handlers/string-handlers'
import {EndCityInterface} from '../../../shared/types/end-city.interface'
import {StartCityInterface} from '../../../shared/types/start-city.interface'
import {getEndCitiesAction} from './store/actions/get-end-cities.action'
import {getStartCitiesAction} from './store/actions/get-start-cities.action'
import {
  backendErrorsSelector,
  endCitiesSelector,
  isEndCitiesLoadingSelector,
  isStartCitiesLoadingSelector,
  startCitiesSelector,
} from './store/selectors'
import {citiesSelector} from '../../../new-order/shared/components/start-point/store/selectors'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_CITIES}),
    tuiLoaderOptionsProvider({
      size: 'm',
    }),
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements OnInit, OnDestroy {
  isStartCitiesLoading$: Observable<boolean>
  isEndCitiesLoading$: Observable<boolean>
  startCities$: Observable<StartCityInterface[]>
  endCities$: Observable<EndCityInterface[]>
  backendErrors$: Observable<null | string>
  searchStartCity$: Subject<string | null> = new Subject()
  searchEndCity$: Subject<string | null> = new Subject()

  form = this.fb.group({
    startCity: [{value: null, disabled: true}, Validators.required],
    endCity: [{value: null, disabled: true}, Validators.required],
  })

  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  ngOnDestroy() {
    this.form.reset()
  }

  initializeValues(): void {
    this.isStartCitiesLoading$ = this.store.select(isStartCitiesLoadingSelector)
    this.isEndCitiesLoading$ = this.store.select(isEndCitiesLoadingSelector)
    this.startCities$ = this.store.select(startCitiesSelector).pipe(
      filter(Boolean),
      tap(() => {
        this.form.get('startCity').enable({emitEvent: false})
      })
    )

    this.startCities$ = combineLatest([
      this.store.select(startCitiesSelector).pipe(filter(Boolean)),
      this.searchStartCity$.pipe(
        startWith(''),
        filter((searchQuery: string | null) => searchQuery !== null)
      ),
    ]).pipe(
      debounceTime(1000),
      tap(([cities]) => {
        if (cities && this.form.get('startCity').disabled) {
          this.form.get('startCity').enable()
        }
      }),
      map(([cities, searchQuery]: [StartCityInterface[], string]) => {
        return cities.filter((city: StartCityInterface) => {
          return city.name
            .toLowerCase()
            .includes(searchQuery && searchQuery.toLowerCase())
        })
      })
    )

    this.endCities$ = combineLatest([
      this.store.select(endCitiesSelector).pipe(filter(Boolean)),
      this.searchEndCity$.pipe(
        startWith(''),
        filter((searchQuery: string | null) => searchQuery !== null)
      ),
    ]).pipe(
      debounceTime(1000),
      tap(([cities]) => {
        if (cities && this.form.get('endCity').disabled) {
          this.form.get('endCity').enable()
        }
      }),
      map(([cities, searchQuery]: [EndCityInterface[], string]) => {
        return cities.filter((city: EndCityInterface) => {
          return city.name
            .toLowerCase()
            .includes(searchQuery && searchQuery.toLowerCase())
        })
      })
    )

    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.form
      .get('startCity')
      .valueChanges.pipe(
        filter(Boolean),
        tap((city: StartCityInterface) => {
          this.form.get('endCity').patchValue('')
          this.form.get('endCity').enable()
          this.store.dispatch(getEndCitiesAction({cityId: city.id}))
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
    this.isSubmitting = true

    of(this.form.value)
      .pipe(
        filter(Boolean),
        take(1),
        tap(({startCity, endCity}) => {
          this.store.dispatch(changeStartCityAction({city: startCity}))
        }),
        switchMap(({startCity, endCity}) => {
          this.store.dispatch(changeEndCityAction({city: endCity}))
          //TODO:// need to implement here canLoad?
          return of(null)
        }),
        delay(1000),
        tap(() => {
          this.isSubmitting = false
          this.router.navigate(['/new-order'])
        })
      )
      .subscribe()
  }
}
