import {Injectable} from '@angular/core'
import {RegisterRequestInterface} from '../types/register-request.interface'
import {map, Observable} from 'rxjs'
import {CurrentUserInterface} from '../../shared/types/current-user.interface'
import {HttpClient} from '@angular/common/http'
import {AuthResponseInterface} from '../types/auth-response.interface'
import {LoginRequestInterface} from '../types/login-request.interface'
import {CurrentUserInputInterface} from '../../shared/types/current-user-input.interface'
import {environment} from '../../../environments/environment.prod'
import {tap} from 'rxjs/operators'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface) {
    return response.user
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users`

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login({user}: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = `/api/account/login`

    return this.http.post<CurrentUserInterface>(
      url,
      JSON.stringify({
        'api-key': environment.apiKey,
        login: user.email,
        password: user.password,
      })
    )
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`

    return this.http.get(url).pipe(map(this.getUser))
  }

  updateCurrentUser(
    currentUserInput: CurrentUserInputInterface
  ): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`
    return this.http
      .put<AuthResponseInterface>(url, currentUserInput)
      .pipe(map(this.getUser))
  }
}
