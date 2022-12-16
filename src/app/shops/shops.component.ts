import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsComponent {
  shopIndex = 0
  shopsCount = 4
  pointsIndex = 0
  pointsCount = 4

  public readonly shops = [`shopping-live`, `decathlon`, `zara`, `child-world`]

  public readonly points = [`iml`, `boxberry`, `hermes`, `kce`]

  constructor() {}

  onShopIndex(index: number): void {
    this.shopIndex = index
  }

  onPointsIndex(index: number): void {
    this.shopIndex = index
  }
}
