import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {documentByIdSelector} from '../../store/documents/selectors'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {Store} from '@ngrx/store'
import {DomSanitizer} from '@angular/platform-browser'
import {Observable} from 'rxjs'
import {DocumentInterface} from '../../shared/types/document.interface'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {CourierServiceInterface} from './types/courier-service.interface'
import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'
import {
  backendErrorsSelector,
  isServicesLoadingSelector,
  servicesSelector,
} from './store/selectors'
import {getServicesAction} from './store/actions/get-services.action'

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourierComponent {
  $doc: Observable<DocumentInterface>
  isServicesLoading$: Observable<boolean>
  services$: Observable<CourierServiceInterface[]>
  backendErrors$: Observable<BackendErrorsInterface>

  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initValues()
    this.fetchData()
  }

  initValues(): void {
    this.$doc = this.store.select(documentByIdSelector('tarif_kurier'))
    this.isServicesLoading$ = this.store.select(isServicesLoadingSelector)
    this.services$ = this.store.select(servicesSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  fetchData(): void {
    this.store.dispatch(getServicesAction())
  }

  showPdf(
    {name, link},
    actions: PolymorpheusContent<TuiPdfViewerOptions>
  ): void {
    this.pdfService
      .open(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          this.isMobile
            ? `https://drive.google.com/viewerng/viewer?embedded=true&url=${link}`
            : link
        ),
        {
          label: name,
          actions,
        }
      )
      .subscribe()
  }
}
