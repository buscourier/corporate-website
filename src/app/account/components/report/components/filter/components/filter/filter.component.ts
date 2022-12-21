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
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {Observable, takeUntil} from 'rxjs'
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  isStartCitiesLoading$: Observable<boolean>
  isEndCitiesLoading$: Observable<boolean>
  startCities$: Observable<StartCityInterface[]>
  endCities$: Observable<EndCityInterface[]>
  backendErrors$: Observable<null | string>

  @Output('filterChanged') filterChangedEvent = new EventEmitter<any>()

  form = this.fb.group({
    range: [],
    startCity: null,
    endCity: {value: null, disabled: true},
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
    this.startCities$ = this.store.select(startCitiesSelector)
    this.endCities$ = this.store.select(endCitiesSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.form
      .get('startCity')
      .valueChanges.pipe(
        tap(({id}: StartCityInterface) => {
          this.form.get('endCity').patchValue('')
          this.form.get('endCity').enable()
          this.store.dispatch(getEndCitiesAction({cityId: id}))
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  fetchData(): void {
    this.store.dispatch(getStartCitiesAction())
  }

  onSubmit() {
    this.filterChangedEvent.emit(this.form.value)
  }
}
