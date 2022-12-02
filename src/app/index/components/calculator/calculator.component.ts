import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {StartCityInterface} from '../../../shared/types/start-city.interface'
import {EndCityInterface} from '../../../shared/types/end-city.interface'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {
  backendErrorsSelector,
  endCitiesSelector,
  isEndCitiesLoadingSelector,
  isStartCitiesLoadingSelector,
  startCitiesSelector,
} from './store/selectors'
import {tap} from 'rxjs/operators'
import {getEndCitiesAction} from './store/actions/get-end-cities.action'
import {getStartCitiesAction} from './store/actions/get-start-cities.action'
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {STRINGIFY_CITIES} from '../../../shared/handlers/string-handlers'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [tuiItemsHandlersProvider({stringify: STRINGIFY_CITIES})],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent implements OnInit {
  isStartCitiesLoading$: Observable<boolean>
  isEndCitiesLoading$: Observable<boolean>
  startCities$: Observable<StartCityInterface[]>
  endCities$: Observable<EndCityInterface[]>
  backendErrors$: Observable<null | string>

  form = this.fb.group({
    startCity: [null, Validators.required],
    endCity: [{value: '', disabled: true}, Validators.required],
  })

  valueChangesSub: Subscription

  constructor(private fb: FormBuilder, private store: Store) {}

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
        tap(({id}: StartCityInterface) => {
          this.form.get('endCity').patchValue('')
          this.form.get('endCity').enable()
          this.store.dispatch(getEndCitiesAction({cityId: id}))
        })
      )
      .subscribe()
  }

  fetchData(): void {
    this.store.dispatch(getStartCitiesAction())
  }

  onSubmit() {}
}
