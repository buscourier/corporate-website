import {ChangeDetectionStrategy, Component} from '@angular/core'
import {TUI_SVG_SRC_PROCESSOR} from '@taiga-ui/core'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
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
export class IndexComponent {
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
