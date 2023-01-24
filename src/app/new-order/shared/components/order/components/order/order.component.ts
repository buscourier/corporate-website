import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {takeUntil} from 'rxjs'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OrderComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OrderComponent,
      multi: true,
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit {
  onTouched = () => {}

  form = this.fb.group({
    cargo: '',
    packages: [],
    services: [],
  })

  constructor(
    private fb: FormBuilder,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {}

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value)
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  registerOnChange(onChange: any) {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(onChange)
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

  invalid(): ValidationErrors | null {
    const invalid =
      this.form.get('cargo').invalid ||
      this.form.get('packages').invalid ||
      this.form.get('services').invalid

    if (invalid) {
      return {invalid: true}
    } else {
      return null
    }
  }

  validate(): ValidationErrors | null {
    return this.invalid()
  }
}
