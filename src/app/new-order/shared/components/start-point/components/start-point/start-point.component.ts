import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPointComponent {}
