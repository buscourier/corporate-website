import {ChangeDetectionStrategy, Component} from '@angular/core'
import {TUI_SVG_SRC_PROCESSOR} from '@taiga-ui/core'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {}
