import {ChangeDetectionStrategy, Component} from '@angular/core'
import {main, top} from './nav'

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFooterComponent {
  topNav = top
  mainNav = main

  constructor() {}
}
