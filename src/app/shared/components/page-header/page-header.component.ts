import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {tuiPure} from '@taiga-ui/cdk'
import {
  TUI_SVG_SRC_PROCESSOR,
  TuiDurationOptions,
  tuiHeightCollapse,
} from '@taiga-ui/core'
import {filter, Observable} from 'rxjs'
import {LoginService} from '../../../auth/components/login/services/login.service'
import {logoutAction} from '../../../auth/store/actions/sync.action'
import {
  currentUserSelector,
  isAnonymousSelector,
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

  nav = nav
  activeDropdown = null
  isSticky = false
  isMobileMenuOpen = false
  isBannerClosed = false

  isLoggedIn$: Observable<boolean>
  isAnonymous$: Observable<boolean>
  currentUser$: Observable<CurrentUserInterface>

  constructor(
    private store: Store,
    @Inject(LoginService) private readonly loginService: LoginService,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.isAnonymous$ = this.store.select(isAnonymousSelector)
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
    this.loginService.open(null).subscribe()
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

  @HostListener('window:scroll', ['$event'])
  scroll(e: Event) {
    this.setStickyMenu()
    // console.log('event', (e.currentTarget as Element).pageYOffset)
  }

  setStickyMenu() {}

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return {value: ``, params: {duration}}
  }

  truncate(name: string) {
    return name.slice(0, 20) + '...'
  }
}
