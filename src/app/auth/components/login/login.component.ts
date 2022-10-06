import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {LoginRequestInterface} from '../../types/login-request.interface'
import {loginAction} from '../../store/actions/login.action'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {TuiDialog} from "@taiga-ui/cdk"
import { LoginOptionsInterface } from './types/login-options.interface'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<LoginOptionsInterface, boolean>
    ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(validationErrorsSelector)
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onClick(response: boolean): void {
    this.context.completeWith(response);
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    }

    this.store.dispatch(loginAction({request}))
  }
}
