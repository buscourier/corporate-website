import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'

@Component({
  selector: 'app-how-to-send',
  templateUrl: './how-to-send.component.html',
  styleUrls: ['./how-to-send.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToSendComponent {
  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean
  ) {}

  showPdf(actions: PolymorpheusContent<TuiPdfViewerOptions>): void {
    this.pdfService
      .open(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://busbox.guru/uploads/pages/Правила_приёмки_и_отправки_грузов_Баскурьер.pdf`
        ),
        {
          label: `Правила приемки и отправки грузов`,
          actions,
        }
      )
      .subscribe()
  }
}
