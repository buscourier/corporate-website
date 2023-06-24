import {ChangeDetectionStrategy, Component} from '@angular/core'
import {Store} from '@ngrx/store'
import {getDocumentsAction} from '../store/documents/actions/get-documents.action'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.store.dispatch(getDocumentsAction())
  }
}
