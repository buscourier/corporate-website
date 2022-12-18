import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  links = [
    {
      name: 'Как отправить посылку',
      href: 'how-to-send',
    },
    {
      name: 'Как получить посылку',
      href: 'how-to-get',
    },
    {
      name: 'Правила приемки и отправки грузов',
      href: 'rules',
    },
    {
      name: 'Тарифы на перевозку',
      href: 'tariff',
    },
    {
      name: 'Упаковки грузов и виды упаковки',
      href: 'packaging',
    },
    {
      name: 'Хранение груза',
      href: 'storage',
    },
    {
      name: 'Доставка грузов и багажа из Аэропорта',
      href: 'airport',
    },
  ]

  constructor() {}
}
