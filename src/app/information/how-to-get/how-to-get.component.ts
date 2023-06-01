import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiDialogService} from '@taiga-ui/core'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {
  PolymorpheusComponent,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus'
import {Observable, take} from 'rxjs'
import {CitiesComponent} from '../../shared/components/cities/cities.component'
import {Store} from '@ngrx/store'
import {DocumentInterface} from '../../shared/types/document.interface'
import {
  documentByIdSelector,
  isDocumentsLoadingSelector,
} from '../../store/documents/selectors'

@Component({
  selector: 'app-how-to-get',
  templateUrl: './how-to-get.component.html',
  styleUrls: ['./how-to-get.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToGetComponent implements OnInit {
  rulesDoc$: Observable<DocumentInterface>

  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initValues()
  }

  initValues(): void {
    this.rulesDoc$ = this.store.select(documentByIdSelector('rules'))
  }

  showPdf(
    {name, type, link},
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
