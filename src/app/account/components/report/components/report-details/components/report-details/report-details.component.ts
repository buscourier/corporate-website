import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {Observable} from 'rxjs'
import {environment} from '../../../../../../../../environments/environment'
import {cancelOrderAction} from '../../store/actions/cancel-order.action'
import {getOrderAction} from '../../store/actions/get-order.action'
import {
  backendErrorsSelector,
  detailsSelector,
  isLoadingSelector,
  isSubmittingSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-order-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailsComponent {
  isLoading$: Observable<boolean>
  isSubmitting$: Observable<boolean>
  orderCanceled$: Observable<boolean>
  backendErrors$: Observable<string>
  order$: Observable<any>

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private store: Store
  ) {}

  get orderId(): number {
    return this.context.data.orderId
  }

  get userId(): number {
    return this.context.data.userId
  }

  ngOnInit(): void {
    this.fetchData()
    this.initialazeValues()
  }

  fetchData() {
    this.store.dispatch(getOrderAction({orderId: this.orderId.toString()}))
  }

  initialazeValues() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.order$ = this.store.select(detailsSelector)
  }

  cancelOrder() {
    this.store.dispatch(
      cancelOrderAction({
        data: {
          'api-key': environment.apiKey,
          'user-id': this.userId.toString(),
          'order-id': this.orderId.toString(),
        },
      })
    )
    this.close()
  }

  close() {
    this.context.completeWith(1)
  }

  formatDimensions(params: any) {
    return Object.entries(params)
      .filter((param) => {
        return param[0] !== 'count' && param[0] !== 'weight'
      })
      .map((param) => {
        return `<div class="flex flex-col">
           <small>${param[0]}</small>
           <b>${param[1]} см.</b>
        </div>`
      })
      .join(' x ')
  }
}

// `<span class="flex flex-col"
//                 ><small>Ширина:</small> <b>{{ dim.width }} см.</b></span
//               >
//               <b>х</b>
//               <span class="flex flex-col"
//                 ><small>Высота:</small> <b>{{ dim.height }} см.</b></span
//               >
//               <b>х</b>
//               <span class="flex flex-col"
//                 ><small>Длина:</small> <b>{{ dim.length }} см.</b></span
//               >`
