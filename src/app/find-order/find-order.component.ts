import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {filter, interval, map, Observable, switchMap, takeUntil} from 'rxjs'
import {getStatusesAction} from './store/actions/get-statuses.action'
import {
  backendErrorsSelector,
  isStatusesLoadingSelector,
  statusesSelector,
} from './store/selectors'
import {OrderStatusInterface} from './types/order-status.interface'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {tap} from 'rxjs/operators'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {BackendErrorsInterface} from '../shared/types/backend-errors.interface'
import {deleteStatusesAction} from './store/actions/delete-statuses.action'

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindOrderComponent implements OnInit, OnDestroy {
  isStatusesLoading$: Observable<boolean>
  statuses$: Observable<OrderStatusInterface[]>
  backendErrors$: Observable<string>

  orderId = this.fb.control('', [
    Validators.minLength(7),
    Validators.maxLength(7),
  ])

  form = this.fb.group({
    orderId: this.orderId,
  })

  public Status = {
    ORDER_POSTING: 'yellow',
    ORDER_INTRANSIT: 'yellow',
    ORDER_SORTING: 'yellow',
    ORDER_READY: 'blue',
    ORDER_DELIVERED: 'blue',
    ORDER_SELFEXTRACT: 'yellow',
    ORDER_RETURN: 'yellow',
    ORDER_FAILURE: 'red',
    ORDER_STORAGE: 'blue',
    ORDER_RESENT: 'yellow',
    ORDER_CANCELED: 'red',
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public route: ActivatedRoute,
    private router: Router,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.isStatusesLoading$ = this.store.select(isStatusesLoadingSelector)
    this.statuses$ = this.store.select(statusesSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector).pipe(
      map((errors: BackendErrorsInterface) => {
        return errors ? errors.toString().split(': ')[1] : null
      })
    )
    this.route.queryParams
      .pipe(
        tap(({orderId}: Params) => {
          if (orderId) {
            this.orderId.setValue(orderId)

            setTimeout(() => {
              this.onSubmit()
            }, 0)
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.form.valueChanges
      .pipe(
        tap((values) => {
          if (this.form.invalid) {
            this.deleteStatuses()
            this.router.navigate(['/find-order'])
          }
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.deleteStatuses()
  }

  deleteStatuses(): void {
    this.store.dispatch(deleteStatusesAction())
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const {orderId} = this.form.value
    this.store.dispatch(getStatusesAction({orderId}))
  }

  formatDate(date) {
    const datetime = date.split(' ')
    const formattedDate = new Intl.DateTimeFormat('ru-Ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(datetime[0]))

    return formattedDate
  }
}
