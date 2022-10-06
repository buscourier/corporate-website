import {Component, Inject} from '@angular/core'
import {LoginService} from "./auth/components/login/services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-tailwind-starter'

  constructor( @Inject(LoginService) private readonly loginService: LoginService) {}

  onClick() {
    this.loginService.open(null)
      .subscribe()
  }
}
