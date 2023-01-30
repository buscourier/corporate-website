import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {registerAction} from '../../store/actions/register.action'
import {
  isSubmittingSelector,
  backendErrorsSelector,
} from '../../store/selectors'
import {RegisterRequestInterface} from '../../types/register-request.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value,
    }

    this.store.dispatch(registerAction({request}))
  }
}
