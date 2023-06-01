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
import {screenSizeSelector} from '../../store/global/selectors'
import {DocumentInterface} from '../../shared/types/document.interface'
import {documentByIdSelector} from '../../store/documents/selectors'

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirportComponent implements OnInit {
  personalDoc$: Observable<DocumentInterface>
  entityDoc$: Observable<DocumentInterface>
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
    this.personalDoc$ = this.store.select(documentByIdSelector('warrant_fiz'))
    this.entityDoc$ = this.store.select(documentByIdSelector('warrant_ur'))

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
