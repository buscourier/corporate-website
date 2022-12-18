import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceComponent {}
