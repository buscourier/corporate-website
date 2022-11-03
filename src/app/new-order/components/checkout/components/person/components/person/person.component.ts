import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
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

  onTouched = () => {}
  onChangeSub: Subscription

  registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange)
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value)
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  ngOnInit() {
    this.onTouched()
    this.cdr.detectChanges()
    console.log('ssdfsdfs444')
  }

  ngOnDestroy() {
    this.onChangeSub.unsubscribe()
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}
}
