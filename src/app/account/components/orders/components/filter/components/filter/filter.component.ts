import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'
import {backendErrorsSelector} from '../../store/selectors'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  backendErrors$: Observable<null | string>
  statuses = ['Готов к выдаче', 'Подготовка к отправке', 'Возврат', 'Испорчено']

  @Output('filterChanged') filterChangedEvent = new EventEmitter<any>()

  form = this.fb.group({
    range: [],
    status: '',
  })

  valueChangesSub: Subscription

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  // ngOnDestroy(): void {
  //   if (this.valueChangesSub) {
  //     this.valueChangesSub.unsubscribe()
  //   }
  // }

  initializeValues(): void {
    this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  onSubmit() {
    this.filterChangedEvent.emit(this.form.value)
  }
}
