import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {Observable, of, Subscription} from 'rxjs'
import {concatAll, filter, switchMap, tap, toArray} from 'rxjs/operators'
import {STRINGIFY_CARGOS} from '../../../../../../../../shared/handlers/string-handlers'
import {CargoInterface} from '../../../../../../types/cargo.interface'
import {allCargosSelector} from '../../../../../orders/store/selectors'

@Component({
  selector: 'app-other-cargos',
  templateUrl: './other-cargos.component.html',
  styleUrls: ['./other-cargos.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OtherCargosComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OtherCargosComponent,
      multi: true,
    },
    tuiItemsHandlersProvider({stringify: STRINGIFY_CARGOS}),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherCargosComponent implements OnInit {
  cargos$: Observable<CargoInterface[]>

  onTouched = () => {}
  onChangeSub: Subscription
  detailChangedSub: Subscription

  detail = this.fb.control(null, [Validators.required])
  places = this.fb.control(1, [Validators.required])

  form = this.fb.group({
    detail: this.detail,
    places: this.places,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy() {
    this.detailChangedSub.unsubscribe()
  }

  initializeValues() {
    this.places.disable()
    this.cargos$ = this.store.select(allCargosSelector).pipe(
      switchMap((cargos: CargoInterface[]) => {
        return of(cargos).pipe(
          concatAll(),
          filter((cargo: CargoInterface) => cargo.parent_id === '21'),
          toArray()
        )
      })
    )

    this.detailChangedSub = this.detail.valueChanges
      .pipe(
        tap((value) => {
          if (value) {
            this.places.enable()
            // this.detail.disable({emitEvent: false})
          }
        })
      )
      .subscribe()
  }

  delete() {
    this.form.setValue({
      detail: null,
      places: 1,
    })

    this.places.disable()
    this.detail.enable()
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value)
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange)
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  allRequiredFieldsFilled(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value
    const isValid = controlValue?.email && controlValue?.name
    return isValid ? null : {required: true}
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null
    // return this.allRequiredFieldsFilled(control)
  }
}