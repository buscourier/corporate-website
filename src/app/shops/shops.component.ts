import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {screenSizeSelector} from '../store/global/selectors'

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsComponent implements OnInit {
  screenSize$: Observable<string>

  shopIndex = 0
  shopsCount = 4
  pointsIndex = 0
  pointsCount = 4

  public readonly shops = [`shopping-live`, `decathlon`, `zara`, `child-world`]

  public readonly points = [`iml`, `boxberry`, `hermes`, `kce`]

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store
      .select(screenSizeSelector)
      .pipe(
        tap((size: string) => {
          switch (size) {
            case 'xs':
              this.shopsCount = 1
              this.pointsCount = 1
              break
            case 'sm':
              this.shopsCount = 2
              this.pointsCount = 2
              break
            case 'md':
              this.shopsCount = 3
              this.pointsCount = 3
              break
            case 'lg':
              this.shopsCount = 4
              this.pointsCount = 4
              break
          }

          this.shopIndex = 0
        })
      )
      .subscribe(() => {
        this.cdr.markForCheck()
      })
  }

  onShopIndex(index: number): void {
    this.shopIndex = index
  }

  onPointsIndex(index: number): void {
    this.shopIndex = index
  }
}
