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
import {
  TUI_SVG_SRC_PROCESSOR,
  TuiDurationOptions,
  tuiFadeIn,
  tuiHeightCollapse,
} from '@taiga-ui/core'
import nav from './nav'
import {tuiPure} from '@taiga-ui/cdk'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../../auth/store/selectors'
import {LoginService} from '../../../auth/components/login/services/login.service'
import {logoutAction} from '../../../auth/store/actions/sync.action'
import {animate, style, transition, trigger} from '@angular/animations'
import {PersistenceService} from '../../services/persistence.service'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(0.25rem)'}),
        animate(
          '100ms ease-out',
          style({opacity: 1, transform: 'translateY(0)'})
        ),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(
          '150ms ease-in',
          style({opacity: 0, transform: 'translateY(0.25rem)'})
        ),
      ]),
    ]),
    tuiHeightCollapse,
  ],
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
}
