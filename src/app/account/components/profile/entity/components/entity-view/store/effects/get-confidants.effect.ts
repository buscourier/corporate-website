import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {ConfidantsService} from 'src/app/shared/services/confidants.service'
import {ConfidantInterface} from 'src/app/shared/types/confidant.interface'
import {
  getConfidantsAction,
  getConfidantsFailureAction,
  getConfidantsSuccessAction,
} from '../actions/get-confidants.action'

@Injectable()
export class GetConfidantsEffect {
  constructor(
    private actions$: Actions,
    private confidantsService: ConfidantsService
  ) {}

  getConfidants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getConfidantsAction),
      switchMap(({userId}) => {
        return this.confidantsService.getData(userId).pipe(
          map((confidants: ConfidantInterface[]) =>
            getConfidantsSuccessAction({confidants})
          ),
          catchError(() => of(getConfidantsFailureAction()))
        )
      })
    )
  )
}
