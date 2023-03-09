import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {tuiPure} from '@taiga-ui/cdk'
import {
  TUI_SVG_SRC_PROCESSOR,
  TuiDialogService,
  TuiDurationOptions,
  tuiHeightCollapse,
  tuiLoaderOptionsProvider,
} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {filter, Observable, take} from 'rxjs'
import {LoginComponent} from '../../../auth/components/login/login.component'
import {logoutAction} from '../../../auth/store/actions/sync.action'
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoadingSelector,
  isLoggedInSelector,
} from '../../../auth/store/selectors'
import {fadeIn} from '../../animations/fade'
import {PersistenceService} from '../../services/persistence.service'
import {CurrentUserInterface} from '../../types/current-user.interface'
import nav from './nav'

const MAPPER: Record<string, string> = {
  customPhoneIcon: 'phone',
}

export function iconsPath(name: string): string {
  return `assets/icons/${MAPPER[name]}.svg#${MAPPER[name]}`
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, tuiHeightCollapse],
  providers: [
    tuiLoaderOptionsProvider({
      size: 's',
    }),
    {
      provide: TUI_SVG_SRC_PROCESSOR,
      useFactory: () => {
        return (src: string): string => {
          const myCustomPrefix = `icons::`

          return src.startsWith(myCustomPrefix)
            ? `assets/icons/${src.replace(myCustomPrefix, ``)}.svg`
            : src
        }
      },
    },
    // {
    //   provide: TUI_ICONS_PATH,
    //   useValue: iconsPath,
    // },
  ],
})
export class PageHeaderComponent implements OnInit {
  @Input() animationSpeed = 300
  @ViewChild('header', {read: ElementRef}) header: ElementRef

  @HostBinding('class.header-is-sticky') isSticky = false

  nav = nav
  activeDropdown = null
  isMobileMenuOpen = false
  isBannerClosed = false

  isLoggedIn$: Observable<boolean>
  isAnonymous$: Observable<boolean>
  isCurrentUserLoading$: Observable<boolean>
  currentUser$: Observable<CurrentUserInterface>

  constructor(
    private store: Store,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.isAnonymous$ = this.store.select(isAnonymousSelector)
    this.isCurrentUserLoading$ = this.store.select(isLoadingSelector)
    this.currentUser$ = this.store
      .select(currentUserSelector)
      .pipe(filter(Boolean))
    this.isBannerClosed = !!this.persistenceService.get('bannerClosed')
  }

  showDropdown(dropdown) {
    this.activeDropdown = dropdown
  }

  closeDropdown() {
    this.activeDropdown = null
  }

  login() {
    this.dialogService
      .open<any>(new PolymorpheusComponent(LoginComponent, this.injector), {
        dismissible: true,
        closeable: false,
        size: 'auto',
      })
      .pipe(take(1))
      .subscribe()
  }

  logout() {
    this.store.dispatch(logoutAction())
    this.activeDropdown = null
  }

  toggleMobileMenu(open: boolean): void {
    this.isMobileMenuOpen = open
    this.activeDropdown = null
  }

  closeBanner() {
    this.persistenceService.set('bannerClosed', true)
    this.isBannerClosed = true
  }

  @HostListener('window:scroll')
  scroll() {
    if (this.header) {
      const sticky = this.header.nativeElement.offsetTop
      this.isSticky = window.pageYOffset > sticky
    } else {
      this.isSticky = false
    }
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return {value: ``, params: {duration}}
  }

  getCurrentUserName(user: CurrentUserInterface) {
    return user.user_name.slice(0, 20) + '...'
  }
}
