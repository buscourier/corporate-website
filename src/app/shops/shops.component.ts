import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsComponent {
  constructor() {}
}
