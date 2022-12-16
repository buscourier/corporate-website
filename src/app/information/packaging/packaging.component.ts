import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagingComponent {
  constructor() {}
}
