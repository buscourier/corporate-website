import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {filter, Observable, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {StartCityInterface} from 'src/app/shared/types/start-city.interface'
import {EndCityInterface} from '../../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {startCitySelector} from '../../../start-point/store/selectors'
import {getCitiesAction} from '../../store/actions/get-cities.action'
import {
  citiesSelector,
  isCitiesLoadedSelector,
  isCitiesLoadingSelector,
  isOfficesLoadingSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-end-point',
  templateUrl: './end-point.component.html',
  styleUrls: ['./end-point.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndPointComponent implements OnInit {
  isCitiesLoading$: Observable<boolean>
  isCitiesLoaded$: Observable<boolean>
  isOfficesLoading$: Observable<boolean>
  cities$: Observable<EndCityInterface[]>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string | null>
  activeTabIndex$: Observable<number>

  city = this.fb.control(null, [Validators.required])
  get = this.fb.control(null, [Validators.required])
  delivery = this.fb.control(null, [Validators.required])
  needToMeet = this.fb.control(null, [Validators.required])

  form = this.fb.group({
    city: this.city,
    get: this.get,
    delivery: this.delivery,
    needToMeet: this.needToMeet,
  })

  tabs: string[]

  readonly TabName = {
    give: 'Забрать в отделении',
    delivery: 'Вызвать курьера',
    needToMeet: 'Встретить с автобуса',
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  fetchData() {
    this.store
      .select(isCitiesLoadedSelector)
      .pipe(
        filter((isCitiesLoaded: boolean) => !isCitiesLoaded),
        switchMap(() => {
          return this.store.select(startCitySelector).pipe(
            filter(Boolean),
            tap((startCity: StartCityInterface) => {
              this.store.dispatch(getCitiesAction({cityId: startCity.id}))
            })
          )
        })
      )
      .subscribe()
  }

  initializeValues() {
    this.isCitiesLoading$ = this.store.select(isCitiesLoadingSelector)
    this.isOfficesLoading$ = this.store.select(isOfficesLoadingSelector)
    this.cities$ = this.store.select(citiesSelector).pipe(
      filter(Boolean),
      tap(() => {
        this.city.enable()
      })
    )
  }
}
