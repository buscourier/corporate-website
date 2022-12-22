import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {
  delay,
  filter,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
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

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_CITIES}),
    tuiLoaderOptionsProvider({
      size: 'm',
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements OnInit {
  isStartCitiesLoading$: Observable<boolean>
  isEndCitiesLoading$: Observable<boolean>
  startCities$: Observable<StartCityInterface[]>
  endCities$: Observable<EndCityInterface[]>
  backendErrors$: Observable<null | string>
  valueChangesSub: Subscription

  form = this.fb.group({
    startCity: [null, Validators.required],
    endCity: [{value: null, disabled: true}, Validators.required],
  })

  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  ngOnDestroy(): void {
    this.valueChangesSub.unsubscribe()
  }

  initializeValues(): void {
    this.isStartCitiesLoading$ = this.store.select(isStartCitiesLoadingSelector)
    this.isEndCitiesLoading$ = this.store.select(isEndCitiesLoadingSelector)
    this.startCities$ = this.store.select(startCitiesSelector)
    this.endCities$ = this.store.select(endCitiesSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.valueChangesSub = this.form
      .get('startCity')
      .valueChanges.pipe(
        tap((city: StartCityInterface) => {
          this.form.get('endCity').patchValue('')
          this.form.get('endCity').enable()
          this.store.dispatch(getEndCitiesAction({cityId: city.id}))
        })
      )
      .subscribe()
  }

  fetchData(): void {
    this.store.dispatch(getStartCitiesAction())
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
