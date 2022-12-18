import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  links = [
    {
      name: 'Поиск заказа',
      href: '/find-order',
    },
    {
      name: 'Личный кабинет',
      href: '/account',
    },
    {
      name: 'Онлайн-заявка',
      href: '/new-order/checkout',
    },
    {
      name: 'Расчет тарифа',
      href: '/new-order',
    },
  ]

  constructor() {}
}
