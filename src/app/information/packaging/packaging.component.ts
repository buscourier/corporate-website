import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiPdfViewerService} from '@taiga-ui/kit'
import {Observable} from 'rxjs'
import {DocumentInterface} from '../../shared/types/document.interface'
import {Store} from '@ngrx/store'
import {documentByIdSelector} from '../../store/documents/selectors'

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagingComponent implements OnInit {
  rulesDoc$: Observable<DocumentInterface>
  tariffsDoc$: Observable<DocumentInterface>

  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.rulesDoc$ = this.store.select(documentByIdSelector('rules'))
    this.tariffsDoc$ = this.store.select(documentByIdSelector('upakovka'))
  }

  showPdf({label, link}, actions): void {
    this.pdfService
      .open(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          this.isMobile
            ? `https://drive.google.com/viewerng/viewer?embedded=true&url=${link}`
            : link
        ),
        {
          label,
          actions,
        }
      )
      .subscribe()
  }
}
