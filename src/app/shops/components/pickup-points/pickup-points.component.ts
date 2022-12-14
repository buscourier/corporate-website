import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-pickup-points',
  templateUrl: './pickup-points.component.html',
  styleUrls: ['./pickup-points.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickupPointsComponent {
  constructor() {}
}
