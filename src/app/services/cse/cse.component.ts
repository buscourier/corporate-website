import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {CalculatorComponent} from './components/calculator/calculator.component'

@Component({
  selector: 'app-cse',
  templateUrl: './cse.component.html',
  styleUrls: ['./cse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CseComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  openCalculator() {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(CalculatorComponent, this.injector),
        {
          dismissible: true,
          closeable: false,
          size: 'auto',
        }
      )
      .subscribe() //TODO: unsubscribe?
  }
}
