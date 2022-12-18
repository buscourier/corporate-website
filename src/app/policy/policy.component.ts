import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyComponent {
  constructor() {}
}
