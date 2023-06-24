import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {documentByIdSelector} from '../../store/documents/selectors'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {Store} from '@ngrx/store'
import {DomSanitizer} from '@angular/platform-browser'
import {Observable} from 'rxjs'
import {DocumentInterface} from '../../shared/types/document.interface'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourierComponent {
  $doc: Observable<DocumentInterface>

  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.$doc = this.store.select(documentByIdSelector('tarif_kurier'))
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
