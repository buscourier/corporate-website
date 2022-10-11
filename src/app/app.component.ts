import {Component, Inject, OnInit} from '@angular/core'
import {LoginService} from './auth/components/login/services/login.service'
import {Store} from '@ngrx/store'
import {isLoggedInSelector} from './auth/store/selectors'
import {Observable} from 'rxjs'
import {getCurrentUserAction} from './auth/store/actions/get-current-user.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Баскурьер'
  isLoggedIn$: Observable<boolean>

  constructor(
    @Inject(LoginService) private readonly loginService: LoginService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.store.dispatch(getCurrentUserAction())
  }

  onClick() {
    this.loginService.open(null).subscribe()
  }
}
