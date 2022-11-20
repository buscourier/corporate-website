import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
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
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {concatAll, filter, map, of, Subscription, take, toArray} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'
import {allServicesSelector} from 'src/app/new-order/shared/components/orders/store/selectors'
import {ServiceInterface} from '../../../../../../types/service.interface'

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PackageComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PackageComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent implements OnInit, OnDestroy {
  servicesSub: Subscription

  boxes = this.fb.array<FormGroup>([])
  safePacks = this.fb.array<FormGroup>([])
  placticPacks = this.fb.array<FormGroup>([])
  skins = this.fb.array<FormGroup>([])
  other = this.fb.array<FormGroup>([])

  form = this.fb.group({
    boxes: this.boxes,
    safePacks: this.safePacks,
    placticPacks: this.placticPacks,
    skins: this.skins,
    other: this.other,
  })

  onTouched = () => {}
  onChangeSub: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy() {
    this.servicesSub.unsubscribe()
  }

  initializeValues() {
    const packages = [
      ...this.boxes.value,
      ...this.placticPacks.value,
      ...this.safePacks.value,
      ...this.skins.value,
      ...this.other.value,
    ]

    if (packages.length > 1) {
      return
    }

    this.servicesSub = this.store
      .select(allServicesSelector)
      .pipe(
        filter(Boolean),
        take(1),
        switchMap((services: ServiceInterface[]) => {
          return of(services).pipe(
            concatAll(),
            filter((service: ServiceInterface) => service.group_id === '1'),
            toArray(),
            map((services: ServiceInterface[]) => {
              services.forEach((service: ServiceInterface) => {
                switch (service.subgroup_id) {
                  case '1':
                    this.boxes.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 1,
                        data: {...service, short_name: 'Коробка'},
                      })
                    )
                    break
                  case '2':
                    this.safePacks.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                  case '3':
                    this.placticPacks.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                  case '6':
                    this.skins.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                  default:
                    this.other.push(
                      this.fb.group({
                        [service.id]: false,
                        count: 0,
                        data: service,
                      })
                    )
                    break
                }
              })
              return services
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

  open() {
    alert(1)
    console.log('form', this.form.value)
    // this.dialogService.open('hello').subscribe()
  }

  openDialog(checkboxControl, content: PolymorpheusContent<TuiDialogContext>) {
    checkboxControl.updateValueAndValidity()

    this.dialogService
      .open(content, {
        size: 's',
        closeable: false,
      })
      .subscribe()
  }

  closeDialog(countControl, checkboxControl) {
    if ((countControl.value && countControl.dirty) || countControl.value > 1) {
      checkboxControl.disable({onlySelf: true, emitEvent: false})
    } else {
      checkboxControl.enable({emitEvent: false})
    }
  }

  clear(e: Event, countControl, checkboxControl) {
    e.preventDefault()
    e.stopPropagation()
    countControl.setValue(1)
    checkboxControl.setValue(false)
    checkboxControl.enable()
  }

  writeValue(value: any) {
    if (value) {
      this.form.patchValue(value, {emitEvent: false, onlySelf: true})
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
