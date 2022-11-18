import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {allServicesSelector} from 'src/app/new-order/shared/components/orders/store/selectors'
import {ServiceInterface} from '../../../../../../types/service.interface'

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent implements OnInit {
  services$: Observable<ServiceInterface[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.services$ = this.store.select(allServicesSelector)
  }
}
