import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-cse',
  templateUrl: './cse.component.html',
  styleUrls: ['./cse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CseComponent {
  constructor() {}
}
