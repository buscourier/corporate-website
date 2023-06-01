import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {}
