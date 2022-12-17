import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiPdfViewerService} from '@taiga-ui/kit'

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagingComponent {
  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean
  ) {}

  showPdf(): void {
    this.pdfService
      .open(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://busbox.guru/uploads/pages/Расписание_отправлений_Владивосток.pdf`
        ),
        {
          label: `Правила приемки и отправки грузов`,
        }
      )
      .subscribe()
  }
}
