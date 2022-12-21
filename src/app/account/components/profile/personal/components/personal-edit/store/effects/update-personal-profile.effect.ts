import {Inject, Injectable, Injector} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {catchError, delay, map, of, switchMap, take} from 'rxjs'
import {tap} from 'rxjs/operators'
import {AlertComponent} from '../../../../../../../../shared/components/alert/alert.component'
import {PersonalService} from '../../../../services/personal.service'
import {PersonalProfileInterface} from '../../../../types/personal-profile.interface'
import {
  updatePersonalProfileAction,
  updatePersonalProfileFailureAction,
  updatePersonalProfileSuccessAction,
} from '../actions/update-personal-profile.action'

@Injectable()
export class UpdatePersonalProfileEffect {
  constructor(
    private actions$: Actions,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private personalService: PersonalService,
    private router: Router
  ) {}

  updateProfile = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePersonalProfileAction),
      delay(1000),
      switchMap(({currentUserId, profileInput}) => {
        return this.personalService
          .updateProfile(currentUserId, profileInput)
          .pipe(
            map((profile: PersonalProfileInterface) => {
              return updatePersonalProfileSuccessAction({profile})
            }),
            catchError(() => {
              return of(
                updatePersonalProfileFailureAction({
                  errors: 'Упс, не удалось обновить данные пользователя',
                })
              )
            })
          )
      })
    )
  )

  successUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePersonalProfileSuccessAction),
        tap(() => {
          this.router.navigate(['/account', 'profile', 'personal'])
        })
      ),
    {dispatch: false}
  )

  failureUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePersonalProfileFailureAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Данные не обновлены',
                  failure: true,
                },
                dismissible: true,
                closeable: false,
                size: 'auto',
              }
            )
            .pipe(take(1))
            .subscribe()
        })
      ),
    {dispatch: false}
  )
}
