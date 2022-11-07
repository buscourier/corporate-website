import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {zip} from 'rxjs'
import {endCitySelector} from '../../../end-point/store/selectors'
import {startCitySelector} from '../../../start-point/store/selectors'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  isCitiesInitialized: boolean
  activeOrderIndex = 0
  orders = this.fb.array([
    this.fb.control('', Validators.required),
    this.fb.control('', Validators.required),
    this.fb.control('', Validators.required),
  ])

  form = this.fb.group({
    orders: this.orders,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  fetchData(): void {}

  initializeValues(): void {
    zip(
      this.store.select(startCitySelector),
      this.store.select(endCitySelector)
    ).subscribe(([startCity, endCity]) => {
      if (startCity && endCity) {
        this.isCitiesInitialized = true
      }
    })
  }

  removeOrder() {
    alert(3)
  }

  selectOrder(index) {
    this.activeOrderIndex = index
  }

  addOrder() {
    alert(1)
  }
}
