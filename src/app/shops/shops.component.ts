import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {Observable, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {screenSizeSelector} from '../store/global/selectors'

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsComponent implements OnInit {
  screenSize$: Observable<string>

  shopIndex = 0
  shopsCount = 4
  pointsIndex = 0
  pointsCount = 4

  public readonly shops = [
    {
      name: 'shopping-live',
      link: 'https://www.shoppinglive.ru/',
    },
    {
      name: 'decathlon',
      link: 'https://www.decathlon.ru/',
    },
    {
      name: 'zara',
      link: 'https://www.zara.com/ru/',
    },
    {
      name: 'child-world',
      link: 'https://www.detmir.ru/',
    },
  ]

  public readonly points = [
    {
      name: 'iml',
      link: 'https://www.oldi.ru/partners/iml/',
    },
    {
      name: 'boxberry',
      link: 'https://boxberry.ru/',
    },
    {
      name: 'hermes',
      link: 'http://hermeslogistic.ru/',
    },
    {
      name: 'kce',
      link: 'https://www.cse.ru/',
    },
  ]

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

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
        }),
        takeUntil(this.destroy$)
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
