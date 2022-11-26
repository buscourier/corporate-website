import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {endPointSelector} from '../../../../../../shared/components/end-point/store/selectors'
import {EndPointStateInterface} from '../../../../../../shared/components/end-point/types/end-point-state.interface'
import {ordersSelector} from '../../../../../../shared/components/orders/store/selectors'
import {startPointSelector} from '../../../../../../shared/components/start-point/store/selectors'
import {StartPointStateInterface} from '../../../../../../shared/components/start-point/types/start-point-state.interface'
import {personSelector} from '../../../step-one/components/person/store/selectors'
import {PersonStateInterface} from '../../../step-one/components/person/types/person-state.interface'
import {recipientSelector} from '../../../step-three/components/recipient/store/selectors'
import {RecipientStateInterface} from '../../../step-three/components/recipient/types/recipient-state.interface'
import {senderSelector} from '../../../step-two/components/sender/store/selectors'
import {SenderStateInterface} from '../../../step-two/components/sender/types/sender-state.interface'
import {entitySelector} from '../../../step-one/store/selectors'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements OnInit {
  startPoint$: Observable<StartPointStateInterface>
  endPoint$: Observable<EndPointStateInterface>
  person$: Observable<PersonStateInterface>
  entity$: Observable<any>
  sender$: Observable<SenderStateInterface>
  recipient$: Observable<RecipientStateInterface>
  orders$: Observable<any>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.startPoint$ = this.store.select(startPointSelector)
    this.endPoint$ = this.store.select(endPointSelector)
    this.person$ = this.store.select(personSelector)
    this.entity$ = this.store.select(entitySelector)
    this.sender$ = this.store.select(senderSelector)
    this.recipient$ = this.store.select(recipientSelector)
    this.orders$ = this.store.select(ordersSelector)
  }
}
