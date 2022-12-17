import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-complex-tasks',
  templateUrl: './complex-tasks.component.html',
  styleUrls: ['./complex-tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexTasksComponent {
  constructor() {}
}
