import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
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
