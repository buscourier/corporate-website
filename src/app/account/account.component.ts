import {ChangeDetectionStrategy, Component} from '@angular/core'
import {TUI_SVG_SRC_PROCESSOR} from '@taiga-ui/core'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_SVG_SRC_PROCESSOR,
      useFactory: () => {
        return (src: string): string => {
          const myCustomPrefix = `icons::`

          return src.startsWith(myCustomPrefix)
            ? `assets/icons/${src.replace(myCustomPrefix, ``)}.svg`
            : src
        }
      },
    },
  ],
})
export class AccountComponent {
  sections = [
    {
      icon: 'icons::catalog',
      title: 'Мои заявки',
      text: '',
      route: '',
    },
    {
      icon: 'icons::catalog',
      title: 'Мои заявки',
      text:
        'Вы еще не создали ни одного отправления<br class="md:hidden" />\n' +
        '    Посмотрите историю ваших отправлений.',
      route: '',
    },
    {
      icon: 'icons::catalog',
      title: 'Мои заявки',
      text:
        'Вы еще не создали ни одного отправления<br class="md:hidden" />\n' +
        '    Посмотрите историю ваших отправлений.',
      route: '',
    },
  ]
}
