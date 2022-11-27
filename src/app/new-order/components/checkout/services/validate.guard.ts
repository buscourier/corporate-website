import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest, map, Observable} from 'rxjs'
import {currentStepSelector, finishedStepsSelector} from '../store/selectors'

@Injectable()
export class ValidateGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return combineLatest([
      this.store.select(currentStepSelector),
      this.store.select(finishedStepsSelector),
    ]).pipe(
      map(([currentStep, finishedSteps]) => {
        const isStepsValid = !!finishedSteps[currentStep - 1]
        // console.log(
        //   'finishedSteps[currentStep - 1] === undefined',
        //   finishedSteps[currentStep - 1] === undefined
        // )

        console.log('isStepsInvalid', isStepsValid)

        // if (!isStepsValid) {
        //   return this.router.parseUrl('/new-order/checkout')
        // }

        return true
      })
    )
  }
}
