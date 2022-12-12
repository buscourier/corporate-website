import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {Observable, take} from 'rxjs'
import {tap} from 'rxjs/operators'
import {
  isLargeScreenSelector,
  mdScreenSelector,
  smScreenSelector,
  xsScreenSelector,
} from '../store/global/selectors'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  xs$: Observable<boolean>
  sm$: Observable<boolean>
  md$: Observable<boolean>
  lg$: Observable<boolean>

  activeTabIndex = 1
  isMobile = true
  isModalMode = false
  detailsOpened = false
  city = new FormControl('')

  constructor(
    private store: Store,
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.xs$ = this.store.select(xsScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = false
        }
      })
    )
    this.sm$ = this.store.select(smScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = true
        }
      })
    )
    this.md$ = this.store.select(mdScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = true
        }
      })
    )
    this.lg$ = this.store.select(isLargeScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = false
        }
      })
    )
  }

  setActiveTabIndex(index: number) {
    this.activeTabIndex = index
  }

  showDetails(data, content: PolymorpheusContent<TuiDialogContext>) {
    if (this.isModalMode) {
      this.detailsOpened = false
      console.log('this.isModalMode show details', this.isModalMode)

      this.dialogService
        .open(content, {
          size: 'm',
          closeable: false,
          // dismissible: false,
        })
        .pipe(take(1))
        .subscribe()
    } else {
      this.detailsOpened = true
    }
  }

  closeDetails(observer = null) {
    if (observer) {
      observer.complete()
    } else {
      this.detailsOpened = false
    }
  }
}
