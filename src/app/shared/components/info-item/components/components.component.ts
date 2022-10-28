import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {}
