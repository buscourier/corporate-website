import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Self,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {Observable, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {screenSizeSelector} from '../../store/global/selectors'

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirportComponent {
  screenSize$: Observable<string>

  pointsIndex = 0
  pointsCount = 4

  public readonly points = [
    {
      name: 'aeroflot-2',
      link: 'https://www.aeroflot.ru/',
    },
    {
      name: 'aurora',
      link: 'https://www.flyaurora.ru',
    },
    {
      name: 'eastjet',
    },
    {
      name: 's7',
      link: 'https://www.s7.ru/',
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
              this.pointsCount = 1
              break
            case 'sm':
              this.pointsCount = 2
              break
            case 'md':
              this.pointsCount = 3
              break
            case 'lg':
              this.pointsCount = 4
              break
          }

          this.pointsIndex = 0
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.cdr.markForCheck()
      })
  }

  onPointsIndex(index: number): void {
    this.pointsIndex = index
  }
}
