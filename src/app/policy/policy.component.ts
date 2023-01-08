import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {
  backendErrorsSelector,
  isMarkupLoadingSelector,
  markupSelector,
} from './store/selectors'
import {getMarkupAction} from './store/actions/get-markup.action'
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyComponent implements OnInit {
  isMarkupLoading$: Observable<boolean>
  markup$: Observable<string>
  backendErrors$: Observable<string>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isMarkupLoading$ = this.store.select(isMarkupLoadingSelector)
    this.markup$ = this.store.select(markupSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.store.dispatch(getMarkupAction())
  }
}
