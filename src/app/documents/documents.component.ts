import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {take} from 'rxjs'

interface DocumentInterface {
  label: string
  link: string
  open: boolean
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent {
  documents = [
    {
      label: 'Правила приемки и отправки грузов Баскурьер',
      link: 'https://busbox.guru/uploads/pages/Правила_приёмки_и_отправки_грузов_Баскурьер.pdf',
      open: true,
    },
    {
      label: 'Договор на оказание услуг Баскурьер',
      link: 'https://busbox.guru/uploads/pages/Договор_на_оказание_услуг_Баскурьер.docx',
      open: false,
    },
    {
      label: 'Расписание отправлений Владивосток',
      link: 'https://busbox.guru/uploads/pages/Расписание_отправлений_Владивосток.pdf',
      open: true,
    },
    {
      label: 'Упаковка прайс',
      link: 'https://busbox.guru/uploads/pages/Упаковка_прайс.pdf',
      open: true,
    },
    {
      label: 'Тарифы Артём',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_Артём.pdf',
      open: true,
    },
    {
      label: 'Тарифы Владивосток (Алеутская)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_Владивосток_Алеутская.pdf',
      open: true,
    },
    {
      label: 'Тарифы Владивосток (Гоголя)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_Владивосток_Гоголя.pdf',
      open: true,
    },
    {
      label: 'Тарифы Владивосток (Русская)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_Владивосток_Русская.pdf',
      open: true,
    },
    {
      label: 'Тарифы Дальнегорск',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_Дальнегорск.pdf',
      open: true,
    },
    {
      label: 'Тарифы Уссурийск',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_Уссурийск.pdf',
      open: true,
    },
    {
      label: 'Хабаровск',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_Хабаровск.pdf',
      open: true,
    },
    {
      label: 'Тарифы Артём (курьер)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_курьер_Артём.pdf',
      open: true,
    },
    {
      label: 'Тарифы Владивосток (курьер)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_курьер_Владивосток.pdf',
      open: true,
    },
    {
      label: 'Тарифы Находка (курьер)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_курьер_Находка.pdf',
      open: true,
    },
    {
      label: 'Тарифы Уссурийск (курьер)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_курьер_Уссурийск.pdf',
      open: true,
    },
    {
      label: 'Тарифы Хабаровск (курьер)',
      link: 'https://busbox.guru/uploads/pages/tarifs/Тарифы_курьер_Хабаровск.pdf',
      open: true,
    },
  ]

  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean
  ) {}

  showPdf(
    {label, link},
    actions: PolymorpheusContent<TuiPdfViewerOptions>
  ): void {
    this.pdfService
      .open(this.sanitizer.bypassSecurityTrustResourceUrl(link), {
        label,
        actions,
      })
      .pipe(take(1))
      .subscribe()
  }
}
