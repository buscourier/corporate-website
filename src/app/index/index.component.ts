import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core'
import {TUI_SVG_SRC_PROCESSOR, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {take} from 'rxjs'
import {CitiesComponent} from './components/cities/cities.component'

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
export class IndexComponent {
  linesLimit = 8

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  toggleLinesClamp(): void {
    this.linesLimit = this.collpasedLines ? 28 : 8
  }

  private get collpasedLines(): boolean {
    return this.linesLimit === 8
  }

  get isClampActive() {
    return this.linesLimit === 28
  }

  showCities(type) {
    this.dialogService
      .open<any>(new PolymorpheusComponent(CitiesComponent, this.injector), {
        data: {
          type,
        },
        dismissible: true,
        closeable: false,
        size: 'm',
      })
      .pipe(take(1))
      .subscribe() //TODO: unsubscribe?
  }
}
