import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {getDocumentsAction} from '../store/documents/actions/get-documents.action'

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.store.dispatch(getDocumentsAction())
  }
}
