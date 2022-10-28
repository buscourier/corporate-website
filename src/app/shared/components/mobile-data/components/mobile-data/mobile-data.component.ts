import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

@Component({
  selector: 'app-mobile-data',
  templateUrl: './mobile-data.component.html',
  styleUrls: ['./mobile-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileDataComponent {
  @Input('key') keyProps: string
  @Input('value') valueProps: string
}
