import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {Observable, take} from 'rxjs'
import {Store} from '@ngrx/store'
import {getCurrentUserAction} from '../auth/store/actions/get-current-user.action'
import {getDocumentsAction} from '../store/documents/actions/get-documents.action'
import {documentsSelector} from '../store/documents/selectors'
import {tap} from 'rxjs/operators'
import {DocumentInterface} from '../shared/types/document.interface'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent implements OnInit {
  documents$: Observable<DocumentInterface[]>

  constructor(
    private store: Store,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean
  ) {}

  ngOnInit(): void {
    this.initValues()
  }

  initValues() {
    this.documents$ = this.store.select(documentsSelector)
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
      .pipe(take(1))
      .subscribe()
  }
}
