import {ChangeDetectionStrategy, Component} from '@angular/core'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {of} from 'rxjs'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_CITIES}),
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
        email: `Укажите корректный email`,
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPointComponent {
  activeTabIndex = 0

  cities$ = of([])
  offices$ = of([])
  isCitiesLoading$ = of(false)

  timeRange = [
    {
      name: '8.00 - 14.00',
    },
    {
      name: '14.00 - 18.00',
    },
  ]
}
