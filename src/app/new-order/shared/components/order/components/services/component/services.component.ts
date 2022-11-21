import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {
  concatAll,
  filter,
  map,
  of,
  Subscription,
  switchMap,
  toArray,
} from 'rxjs'
import {tap} from 'rxjs/operators'
import {ServiceInterface} from '../../../../../types/service.interface'
import {allServicesSelector} from '../../../../orders/store/selectors'

const SMS = '66'
const EXT_SMS = '65'
const INSURANCE_15 = '58'
const INSURANCE_30 = '59'

const INSURANCE_MAX = 30000

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ServicesComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ServicesComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit, OnDestroy {
  servicesSub: Subscription

  services = this.fb.array<FormGroup>([])

  form = this.fb.group({
    services: this.services,
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy() {
    this.servicesSub.unsubscribe()
  }

  initializeValues() {
    this.servicesSub = this.store
      .select(allServicesSelector)
      .pipe(
        filter(Boolean),
        switchMap((services: ServiceInterface[]) => {
          return of(services).pipe(
            concatAll(),
            filter((service: ServiceInterface) => service.group_id === '3'),
            map((service: ServiceInterface) => {
              const id =
                service.id === INSURANCE_15 || service.id === INSURANCE_30
                  ? 'insurance'
                  : service.id

              const name =
                service.id === INSURANCE_15 || service.id === INSURANCE_30
                  ? 'Страхование'
                  : service.name

              return {
                ...service,
                id,
                name,
              }
            }),
            toArray(),
            map((services: ServiceInterface[]) => {
              return [
                ...new Set(
                  services.map((service: ServiceInterface) => service.id)
                ),
              ].map((id: string) => {
                return services.find(
                  (service: ServiceInterface) => service.id === id
                )
              })
            }),
            map((services: ServiceInterface[]) => {
              return services.forEach((service: ServiceInterface) => {
                switch (service.id) {
                  case SMS:
                  case EXT_SMS:
                    this.services.push(
                      this.fb.group({
                        [service.id]: false,
                        phone: [
                          {value: '', disabled: true},
                          [Validators.required],
                        ],
                        data: service,
                      })
                    )
                    break
                  default:
                    this.services.push(
                      this.fb.group({
                        [service.id]: false,
                        sum: [
                          {value: '', disabled: true},
                          [Validators.required, Validators.max(INSURANCE_MAX)],
                        ],
                        data: service,
                      })
                    )
                }
              })
            })
          )
        }),
        tap(() => {
          this.cdr.markForCheck()
        })
      )
      .subscribe()
  }

  getControl(control) {
    return control as FormControl
  }

  toggleService(checkboxControl, control) {
    if (checkboxControl.value) {
      control.enable()
    } else {
      control.disable()
    }
  }

  open() {
    console.log('services form', this.form.value)
  }

  onTouched = () => {}
  onChangeSub: Subscription

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