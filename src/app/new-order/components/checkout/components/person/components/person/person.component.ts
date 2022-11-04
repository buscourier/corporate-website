import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Subscription, using} from 'rxjs'
import {tap} from 'rxjs/operators'
import {valueChangesAction} from '../../store/actions/value-chages.action'
import {initialState} from '../../store/state'
import {PersonStateInterface} from '../../types/person-state.interface'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PersonComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PersonComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  onTouched = () => {}
  onChangeSub: Subscription

  form = this.fb.group({
    name: [initialState.name, [Validators.required]],
    email: [initialState.email, [Validators.required]],
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          tap((values: PersonStateInterface) => {
            this.store.dispatch(valueChangesAction(values))
          })
        )
        .subscribe(),
    () => this.store.select((state: any) => state.person)
  )

  constructor(private fb: FormBuilder, private store: Store) {}

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
    return this.allRequiredFieldsFilled(control)
  }

  ngOnInit(): void {
    this.form.updateValueAndValidity()
    console.log('ths', this.form.value)
  }

  ngOnDestroy() {
    if (this.onChangeSub) {
      this.onChangeSub.unsubscribe()
    }
  }
}
