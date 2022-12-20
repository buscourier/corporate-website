import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiDialogService} from '@taiga-ui/core'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {
  PolymorpheusComponent,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus'
import {take} from 'rxjs'
import {CitiesComponent} from '../../shared/components/cities/cities.component'

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
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  showPdf(actions: PolymorpheusContent<TuiPdfViewerOptions>): void {
    const link = `https://busbox.guru/uploads/pages/Правила_приёмки_и_отправки_грузов_Баскурьер.pdf`

    this.pdfService
      .open(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          this.isMobile
            ? `https://drive.google.com/viewerng/viewer?embedded=true&url=${link}`
            : link
        ),
        {
          label: `Правила приемки и отправки грузов`,
          actions,
        }
      )
      .subscribe()
  }

  showCities() {
    this.dialogService
      .open<any>(new PolymorpheusComponent(CitiesComponent, this.injector), {
        data: {
          type: 'start',
        },
        dismissible: true,
        closeable: false,
        size: 'l',
      })
      .pipe(take(1))
      .subscribe()
  }
}
